import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { AddJob } from "../controllers/job.controller.js";

const router = Router()

router.post('/add',authenticate,authorize("HR"),AddJob)

export default router