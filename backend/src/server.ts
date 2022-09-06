import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import "reflect-metadata";
import appDataSource from "./config/data-source";
import https from "https";
import http from "http";
import fs from "fs";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes";
import friendsRouter from "./routes/friends.routes";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import userAboutRouter from "./routes/user-about.routes";


import { Socket, Server } from "socket.io";
import { Message } from "./entity/message.entity";
import { User } from "./entity/user.entity";
//console.log(process.env)
//database connection
appDataSource
  .initialize()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error("Error occured while initializing database: ", err);
  });

const app: express.Application = express();
const port = process.env.PORT;
const https_port = process.env.HTTPS_PORT;

//middleware

//default cors origin is * but cookies can't be sent when access allow origin is *
//so we need to specify origin from whic we will be receiving requests
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

//parse requests of content type aplication/json without this express can't read http body written in json format
app.use(bodyParser.json());
//parse request of content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
//making server to use cookie-session middleware
/*app.use(
  //will attach property session to request object
  //new session if no valid session is provided before or loaded session from request
  //it will automatically add set cookie header to the response object but only if session were altered
  //cookie in set cookie header will only be base64 encoded not encrypted if we want to secure our cookies
  //we need to set secure flag to true and thus only allowing cookie to be sent with https not http
  //with httponly flag set we cookie can be access only through http not with js user scripts and therefore preventing xss attacks
  cookieSession({
    name: "auth-access-token",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    domain: "localhost",

    maxAge: parseInt(process.env.COOKIE_ACCESS_JWT_EXP)
    //sameSite: 'none',
    //secure: true
  })
)*/


//create router
const router = express.Router();
router.use("/user", userRouter);
router.use("/friends", friendsRouter)
router.use("/auth", authRouter);
router.use("/posts", postRouter)
router.use("/user_about", userAboutRouter)

//Application routing
app.use("/api", router);

//starting the  https server
https
  .createServer(
    {
      key: fs.readFileSync("./src/cert/key.pem"),
      cert: fs.readFileSync("./src/cert/cert.pem"),
    },
    app
  )
  .listen(https_port, () => {
    console.log(`Https server is listening on port: ${https_port}`);
  });


let user_sockets = new Map()

const http_server = http.createServer(app)
const io = new Server(http_server, {cors:{
  origin: true
}})



io.on("connection", async (socket)=>{
  const sessionID = socket.handshake.auth.loggedUserSessionID;
  const userID = socket.handshake.auth.userID
  let roomId
      //@ts-ignore
      socket.sessionID = sessionID;
      //@ts-ignore
      socket.userID = userID;
      

      //@ts-ignore
      const userId = socket.userID
      //@ts-ignore
      console.log(socket.userID)
      //socket.join(userId)

  socket.on("open chat", async ({otherPeerID})=>{
    //retrieving the messages for selected chat 
    console.log("opened chat for "+otherPeerID)
    const messages: Message[] = await appDataSource.getRepository(Message).find({
      where:[
        {senderId: userId, receiverId: otherPeerID},
        {receiverId: userId, senderId: otherPeerID}
      ],
      relations: {
        receiver: {
          user_session: true
        },
        sender: {
          user_session: true
        }
      }
    })

    //joining the room
    roomId = ((userId < otherPeerID) ? (userId + "-with-" + otherPeerID) : (otherPeerID + "-with-" + userId))
    socket.join(roomId)
    console.log("User: "+userId+" joined the room: "+roomId)
    socket.emit("chat", {messages})

  })
  
  
  socket.on('send message', async ({content, to})=>{
   
    //@ts-ignore
     const from = socket.userID

    //save message to db persistence of chat
    const sender = await appDataSource.getRepository(User).findOneBy({id: from})
    const receiver = await appDataSource.getRepository(User).findOneBy({id: to})
   
    let newMsg = new Message()
    newMsg.receiverId = to
    newMsg.senderId = from
    newMsg.text = content
    newMsg.sender = sender
    newMsg.receiver = receiver

    const result = await appDataSource.getRepository(Message).save(newMsg)
     
      //sending message to the chosen room
       //@ts-ignore
      /* socket.to(roomId).emit("receive message", {
        newMessage: result
       })*/

       io.in(roomId).emit("receive message", {
        newMessage: result
       })
    
     
  })
})


http_server.listen(port, () => {
  console.log(`Http server is listening on port: ${port}`);
 
});

//default is http server
/*app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}!`)
})*/
