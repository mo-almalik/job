import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { ApplyJob } from "../controllers/application.controller.js";

const router = Router()

router.post("/apply/:jobId" ,authenticate ,authorize("USER"),ApplyJob)
export default router