import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { GetAllEmailRecovery, GetMyData, GetProfile, deleteAccount, updateAccount, updatePassword } from "../controllers/user.controller.js";


const router = Router()

router.put('/update',authenticate,authorize("USER"),updateAccount)
router.put('/update-password',authenticate,authorize("USER"),updatePassword)
router.delete('/deleteAccount',authenticate ,authorize("USER"),deleteAccount)
router.get('/myAccount',authenticate,authorize("USER"),GetMyData)
router.get('/profile/:id',GetProfile)
router.get('/recoveryEmail/',GetAllEmailRecovery)

export default router