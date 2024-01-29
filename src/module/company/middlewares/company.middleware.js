import { AppError, catchError } from "../../../utils/error.handler.js"
import Company from "../model/company.model.js"


export const  UniqueCompanyEmail = catchError(async (req, res, next) => {
	const { email } = req.body
	const user = await Company.findOne({ email })
	if (user) throw new AppError('This email company is already taken', 400)
	next()
})


export const  UniqueCompanyName = catchError(async (req, res, next) => {
	const { name } = req.body
	const user = await Company.findOne({ name })
	if (user) throw new AppError('This name company is already taken', 400)
	next()
})



export const isOwner = catchError(async(req,res,next)=>{
    const {id:companyID } = req.params
    const HRid = req.user.id
    const company = await Company.findById({_id :companyID})


    if(!company) throw new AppError('not found !',400)
   

    if(company.HR.toString() !== HRid) throw new AppError('forbidden' ,403)
   
next()
})
