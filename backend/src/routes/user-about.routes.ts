import { UserAboutController } from '../controllers/user-about.controller'
import express from 'express'
import { Request, Response } from 'express'
import { AuthJwtMiddleware } from '../middleware/authJwt-middleware'
import upload from '../config/upload.config'


const userAboutRouter = express.Router()

userAboutRouter.get("/files/:name", new UserAboutController().getPhoto);

userAboutRouter.post('/upload',
[new AuthJwtMiddleware().verifyJwtToken,
    upload.single('image')],
    (req,res)=>new UserAboutController().uploadPhoto(req,res)
)

userAboutRouter.route('/setWebsites').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setWebsites
)

userAboutRouter.route('/setPhone').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setPhone
)

userAboutRouter.route('/setEmail').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setEmail
)

userAboutRouter.route('/setLanguage').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setLanguage
)

userAboutRouter.route('/setWorkplace').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setWorkplace
)

userAboutRouter.route('/setCollege').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setCollege
)

userAboutRouter.route('/setHighschool').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setHighschool
)

userAboutRouter.route('/setCurrentPlace').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setCurrentPlace
)

userAboutRouter.route('/setHometown').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setHometown
)

userAboutRouter.route('/setRelationshipStatus').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setRelationshipStatus
)

userAboutRouter.route('/setGender').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setGender
)

userAboutRouter.route('/setInterestedIn').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setInterestedIn
)

userAboutRouter.route('/setBirthDate').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setBirthDate
)

userAboutRouter.route('/setAbout').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setAbout
)

userAboutRouter.route('/setNickname').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setNickname
)

userAboutRouter.route('/setFavQuotes').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setFaveQuotes
)

userAboutRouter.route('/setSocialLinks').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserAboutController().setSocialLinks
)
export default userAboutRouter

