import { Router } from "express";
import authRoter from '../module/auth/auth.routers.js'
import userRouter from '../module/user/routers/user.router.js'
import companyRouter from '../module/company/routers/company.router.js'
import jobRouter from '../module/job/routers/job.router.js'
import applicationRouter from '../module/application/routers/application.router.js'

const router = Router()

router.use('/auth', authRoter)
router.use('/user',userRouter)
router.use('/company',companyRouter)
router.use('/job',jobRouter)
router.use('/application',applicationRouter)

export default router