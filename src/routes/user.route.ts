import { Router } from 'express'
import { signup, signin, profile } from '../controllers/user.controller'
import { auth } from "../middlewares/auth";

const userRouter:Router = Router()

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.get('/profile', auth ,profile)

export default userRouter