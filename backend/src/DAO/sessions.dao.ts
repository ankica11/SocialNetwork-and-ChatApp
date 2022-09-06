import { UserSession } from "../entity/session.entity"
import appDataSource from "../config/data-source"



export class UserSessionDAO{

    deleteSession = async (sessionID)=>{
       try{
       const sessionRepo = appDataSource.getRepository(UserSession)
       const toDelete = await sessionRepo.findOneBy({
        refreshToken: sessionID
       })
       await sessionRepo.remove(toDelete)
       return toDelete
    }catch(err){
        return err
    }
       
    
    }
}