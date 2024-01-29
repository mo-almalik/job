import { Router } from "express";
import authRoter from '../module/auth/auth.routers.js'
import userRouter from '../module/user/routers/user.router.js'
import companyRouter from '../module/company/routers/company.router.js'

const router = Router()

router.use('/auth', authRoter)
router.use('/user',userRouter)
router.use('/company',companyRouter)

export default router