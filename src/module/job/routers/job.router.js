import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { AddJob, DeleteJob, GetAllJobsAndCompanyData, GetJobsOneCompany, jobFilter, updateJob } from "../controllers/job.controller.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { AddjobSchema, deletejobSchema, updatejobSchema } from "../validations/job.validate.js";

const router = Router()

router.post('/add',authenticate,authorize("HR") ,validate(AddjobSchema),AddJob)
router.put('/update/:id',authenticate,authorize("HR"),validate(updatejobSchema),updateJob)
router.delete('/delete/:id',authenticate,authorize("HR"),validate(deletejobSchema),DeleteJob)
router.get('/all-jobs',authenticate ,GetAllJobsAndCompanyData)
router.get('/jobs',authenticate ,GetJobsOneCompany)
router.get('/filter',authenticate ,jobFilter)

export default router