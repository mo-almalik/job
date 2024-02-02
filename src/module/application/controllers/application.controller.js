import Application from "../model/application.model.js";
import { catchError ,AppError } from "../../../utils/error.handler.js";
import User from "../../user/model/user.model.js";

/**---------------------------------
 * @desc      Add New Apply to Job
 * @route     Apply/:jobId
 * @method    POST
 * @access    public (only loggedIn and Role =>  USER )  
 * 
 ----------------------------------*/ 
const ApplyJob = catchError(async(req,res)=>{
    const {jobId}= req.params
    const {id :userid} = req.user 
const {userTechSkills ,userSoftSkills} =req.body

   
    const apply = await Application.create({
        jobId,
        userId:userid,
        userTechSkills,
        userSoftSkills,
       

    })
    res.json({apply})
})

export {
    ApplyJob
}