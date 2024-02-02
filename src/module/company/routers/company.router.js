import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { AddCompanySchema, updateCompanySchema } from "../validations/company.validate.js";
import { UniqueCompanyEmail, UniqueCompanyName, isOwner } from "../middlewares/company.middleware.js";
import { AddCompany, GetCompanyData, deleteCompany, getallapplicationsOneJob, updateCompay } from "../controllers/company.controller.js";

const router = Router()

router.post('/add' , authenticate ,authorize("HR"),validate(AddCompanySchema),UniqueCompanyEmail,UniqueCompanyName,AddCompany)
router.put('/update/:id' ,authenticate ,authorize("HR"),isOwner,validate(updateCompanySchema),UniqueCompanyEmail,UniqueCompanyName,updateCompay)
router.delete('/delete/:id' ,authenticate,authorize("HR"),isOwner,deleteCompany)
router.get('/application/:id' ,authenticate,authorize("HR"),getallapplicationsOneJob)
router.get('/:id',authenticate,authorize("HR"),GetCompanyData)

export default router