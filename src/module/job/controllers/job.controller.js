import { catchError } from "../../../utils/error.handler.js"
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

export{
    AddJob
}