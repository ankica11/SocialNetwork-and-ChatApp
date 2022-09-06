"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
var data_source_1 = __importDefault(require("./config/data-source"));
var https_1 = __importDefault(require("https"));
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var friends_routes_1 = __importDefault(require("./routes/friends.routes"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var post_routes_1 = __importDefault(require("./routes/post.routes"));
var user_about_routes_1 = __importDefault(require("./routes/user-about.routes"));
var socket_io_1 = require("socket.io");
var message_entity_1 = require("./entity/message.entity");
var user_entity_1 = require("./entity/user.entity");
//console.log(process.env)
//database connection
data_source_1.default
    .initialize()
    .then(function () {
    console.log("Database connected...");
})
    .catch(function (err) {
    console.error("Error occured while initializing database: ", err);
});
var app = (0, express_1.default)();
var port = process.env.PORT;
var https_port = process.env.HTTPS_PORT;
//middleware
//default cors origin is * but cookies can't be sent when access allow origin is *
//so we need to specify origin from whic we will be receiving requests
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
//parse requests of content type aplication/json without this express can't read http body written in json format
app.use(body_parser_1.default.json());
//parse request of content type application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
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
var router = express_1.default.Router();
router.use("/user", user_routes_1.default);
router.use("/friends", friends_routes_1.default);
router.use("/auth", auth_routes_1.default);
router.use("/posts", post_routes_1.default);
router.use("/user_about", user_about_routes_1.default);
//Application routing
app.use("/api", router);
//starting the  https server
https_1.default
    .createServer({
    key: fs_1.default.readFileSync("./src/cert/key.pem"),
    cert: fs_1.default.readFileSync("./src/cert/cert.pem"),
}, app)
    .listen(https_port, function () {
    console.log("Https server is listening on port: ".concat(https_port));
});
var user_sockets = new Map();
var http_server = http_1.default.createServer(app);
var io = new socket_io_1.Server(http_server, { cors: {
        origin: true
    } });
io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionID, userID, roomId, userId;
    return __generator(this, function (_a) {
        sessionID = socket.handshake.auth.loggedUserSessionID;
        userID = socket.handshake.auth.userID;
        //@ts-ignore
        socket.sessionID = sessionID;
        //@ts-ignore
        socket.userID = userID;
        userId = socket.userID;
        //@ts-ignore
        console.log(socket.userID);
        //socket.join(userId)
        socket.on("open chat", function (_a) {
            var otherPeerID = _a.otherPeerID;
            return __awaiter(void 0, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //retrieving the messages for selected chat 
                            console.log("opened chat for " + otherPeerID);
                            return [4 /*yield*/, data_source_1.default.getRepository(message_entity_1.Message).find({
                                    where: [
                                        { senderId: userId, receiverId: otherPeerID },
                                        { receiverId: userId, senderId: otherPeerID }
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
                            ];
                        case 1:
                            messages = _b.sent();
                            //joining the room
                            roomId = ((userId < otherPeerID) ? (userId + "-with-" + otherPeerID) : (otherPeerID + "-with-" + userId));
                            socket.join(roomId);
                            console.log("User: " + userId + " joined the room: " + roomId);
                            socket.emit("chat", { messages: messages });
                            return [2 /*return*/];
                    }
                });
            });
        });
        socket.on('send message', function (_a) {
            var content = _a.content, to = _a.to;
            return __awaiter(void 0, void 0, void 0, function () {
                var from, sender, receiver, newMsg, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            from = socket.userID;
                            return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOneBy({ id: from })];
                        case 1:
                            sender = _b.sent();
                            return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOneBy({ id: to })];
                        case 2:
                            receiver = _b.sent();
                            newMsg = new message_entity_1.Message();
                            newMsg.receiverId = to;
                            newMsg.senderId = from;
                            newMsg.text = content;
                            newMsg.sender = sender;
                            newMsg.receiver = receiver;
                            return [4 /*yield*/, data_source_1.default.getRepository(message_entity_1.Message).save(newMsg)
                                //sending message to the chosen room
                                //@ts-ignore
                                /* socket.to(roomId).emit("receive message", {
                                  newMessage: result
                                 })*/
                            ];
                        case 3:
                            result = _b.sent();
                            //sending message to the chosen room
                            //@ts-ignore
                            /* socket.to(roomId).emit("receive message", {
                              newMessage: result
                             })*/
                            io.in(roomId).emit("receive message", {
                                newMessage: result
                            });
                            return [2 /*return*/];
                    }
                });
            });
        });
        return [2 /*return*/];
    });
}); });
http_server.listen(port, function () {
    console.log("Http server is listening on port: ".concat(port));
});
//default is http server
/*app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}!`)
})*/
//# sourceMappingURL=server.js.map