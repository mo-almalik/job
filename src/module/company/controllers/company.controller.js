import { catchError ,AppError } from "../../../utils/error.handler.js";
import Company from "../model/company.model.js";


/**---------------------------------
 * @desc      Add New Company
 * @route    /add
 * @method    POST
 * @access    private (only loggedIn and Role => HR)  
 * 
 ----------------------------------*/ 

 const AddCompany = catchError(async (req,res)=>{

   const {name,description,
    industry,address,
    numberOfEmployees,email} = req.body

    const company = await Company.create({
        name,
        description,
        industry,
        address,
        numberOfEmployees,
        email,
        HR:req.user.id
    })
    res.json({message:"Seccsseflly register company" , company})
 })

const updateCompay = catchError(async (req,res)=>{
    const {name,description,
        industry,address,
        numberOfEmployees,email} = req.body
        const {id :HR} = req.user
        const {id} = req.params
    const company = await Company.findByIdAndUpdate(id,{
        name,
        description,
        industry,
        address,
        numberOfEmployees,
        email,
        HR:req.user.id
    })
    res.json({message:"Seccsseflly updated company info" , company})
})
 export{
    AddCompany,
    updateCompay
 }