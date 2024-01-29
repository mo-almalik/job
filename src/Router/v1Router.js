import { Router } from "express";
import authRoter from '../module/auth/auth.routers.js'
import userRouter from '../module/user/routers/user.router.js'

const router = Router()

router.use('/auth', authRoter)
router.use('/user',userRouter)

export default router