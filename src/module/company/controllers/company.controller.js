import { catchError ,AppError } from "../../../utils/error.handler.js";
import Company from "../model/company.model.js";
import Job from "../../job/model/job.model.js";
import Application from "../../application/model/application.model.js";



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
    res.json({message:" register company" , company})
 })


/**---------------------------------
 * @desc      Update Company
 * @route    /update/:id
 * @method    PUT
 * @access    private (only loggedIn and Role => HR and isOwner)  
 * 
 ----------------------------------*/ 
const updateCompay = catchError(async (req,res)=>{
    const {name,description,
        industry,address,
        numberOfEmployees,email} = req.body
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
    res.json({message:" updated company info" })
})


 
/**---------------------------------
 * @desc      Delete Company
 * @route    /delete/:id
 * @method    DELETE
 * @access    private (only loggedIn and Role => HR and isOwner)  
 * 
 ----------------------------------*/ 

 const deleteCompany= catchError(async(req,res)=>{
    const {id} = req.params
    const company= await Company.findById({_id :id})
    if(!company) throw new AppError("not found !" , 404)
    await Company.findByIdAndDelete({_id :id})
    res.json({message :"deleted company"})
 })


  
/**---------------------------------
 * @desc      Get Company Data And Job
 * @route     /:id
 * @method    GET
 * @access    private (only loggedIn and Role => HR )  
 * 
 ----------------------------------*/ 

 const GetCompanyData = catchError(async(req,res)=>{
 const {id} = req.params
 const {id:HR} = req.user
 const company = await Company.findById({_id:id})
 if(!company) throw new AppError("not found !" ,404)
 const data = await Job.find({addedBy: HR})

 res.json({ company ,data})
 
 })


   
/**---------------------------------
 * @desc      Get Company Application 
 * @route     application/:id
 * @method    GET
 * @access    private (only loggedIn and Owner Role => HR   )  
 * 
 ----------------------------------*/ 
 const getallapplicationsOneJob = catchError(async(req,res)=>{
    const {id} = req.params
    const applications = await Application.find({jobId:id})
 
    res.json({applications})
 })
 export{
    AddCompany,
    updateCompay,
    deleteCompany,
    GetCompanyData,
    getallapplicationsOneJob
 }