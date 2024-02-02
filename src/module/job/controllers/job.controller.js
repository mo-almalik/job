import { AppError, catchError } from "../../../utils/error.handler.js"
import Company from "../../company/model/company.model.js"
import Job from "../model/job.model.js"

/**---------------------------------
 * @desc      Add New Job
 * @route    /add
 * @method    POST
 * @access    private (only loggedIn and Role => HR)  
 * 
----------------------------------*/



const AddJob = catchError(async (req, res) => {

    const { jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills } = req.body


    const job = await Job.create({
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy:req.user.id
    })

    res.json({ message: "Seccsseflly register Job", job })
})



/**---------------------------------
 * @desc      Update  Job
 * @route    /update/:id
 * @method    PUT
 * @access    private (only loggedIn and Role => HR)  
 * 
----------------------------------*/

const updateJob = catchError(async (req, res) => {
 const { id}= req.params
    const { jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills } = req.body

const job = await Job.findById(id)
if(!job) throw new AppError("Job Not Found" , 404)
    await Job.findByIdAndUpdate(id,{
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy:req.user.id
    })

    res.json({ message: "Seccsseflly updated Job" })
})

/**---------------------------------
 * @desc      Delete  Job
 * @route    /delete/:id
 * @method    DELETE
 * @access    private (only loggedIn and Role => HR)  
 * 
----------------------------------*/
const DeleteJob= catchError(async(req ,res)=>{
    const { id}= req.params
    const job = await Job.findById(id)
    if(!job) throw new AppError("Job Not Found" , 404)
    await Job.findByIdAndDelete(id)
    res.json({ message: "Seccsseflly deleted Job" })
})

  
/**---------------------------------
 * @desc      Get Company Data And Job
 * @route     /:id
 * @method    GET
 * @access    public (only loggedIn and Role => HR or USER )  
 * 
 ----------------------------------*/ 
 const GetAllJobsAndCompanyData = catchError(async(req,res)=>{
    
  
        const data = await Company.find().select("-_id") ;
  
        const jobs = await Job.find().populate("addedBy").select("-addedBy")
        

        res.json({ data:{
            "company info" :{ data,
            "jobs": jobs
            },

        } });

    })

/**---------------------------------
 * @desc      Get Company Job  
 * @route     jobs/:id 
 * @method    GET
 * @access    public (only loggedIn and Role => HR or USER )   
 * 
 ----------------------------------*/ 
const GetJobsOneCompany =catchError(async(req,res)=>{
    const {name}=req.query
    const data = await Company.findOne({name}).select("-_id")
    if(!data) throw new AppError("not found !")
    const HR = data.HR 
    const jobs = await Job.find({addedBy : HR}).select(" -addedBy -_id")
    res.json({ data :{
        "Company": data,
        "Jobs":jobs
    }  });
})

/**---------------------------------
 * @desc      Get  Job  by filter
 * @route     jobs-filter?
 * @method    GET
 * @access    public (only loggedIn and Role => HR or USER )   
 * 
 ----------------------------------*/ 
const jobFilter = catchError(async(req,res)=>{

    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    let filters = {};

   
    if (workingTime) filters.workingTime = workingTime;
    if (jobLocation) filters.jobLocation = jobLocation;
    if (seniorityLevel) filters.seniorityLevel = seniorityLevel;
    if (jobTitle) filters.jobTitle = new RegExp(jobTitle, 'i'); 
    if (technicalSkills) filters.technicalSkills = { $all: technicalSkills.split(',') };

    const jobs = await Job.find(filters);
    res.json({ jobs });


})
export{
    AddJob,
    updateJob,
    DeleteJob,
    GetAllJobsAndCompanyData,
    GetJobsOneCompany,
    jobFilter
}