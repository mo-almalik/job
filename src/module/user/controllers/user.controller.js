import bcrypt from 'bcrypt'
import { catchError,AppError} from "../../../utils/error.handler.js";
import User from "../model/user.model.js";

/**---------------------------------
 * @desc      Update Account
 * @route    /update/id
 * @method    PUT
 * @access    private (only loggedIn)  
 * 
 ----------------------------------*/ 
 const updateAccount = catchError(async(req,res)=>{
    const {id}= req.user
    const checkiD = await User.findById(id)
    if(!checkiD) throw new AppError("not found" , 404)

    const {email , mobileNumber , recoveryEmail , DOB , lastName , firstName} = req.body
    const user = await User.findOne({$or:[{email} ,{mobileNumber}]})
    if(user) throw new AppError('email or mobile is alrady taken')
    await User.findByIdAndUpdate(id ,{email , mobileNumber , recoveryEmail , DOB , lastName , firstName})
    res.json({message : "updated seccessfully"})
 })


 /**---------------------------------
 * @desc      Delete Account
 * @route    /delete/id
 * @method    DELETE
 * @access    private (only loggedIn)  
 * 
 ----------------------------------*/ 
const deleteAccount = catchError(async(req,res)=>{
   const {id}= req.user
    const user = await User.findById(id)
    if(!user) throw new AppError("not found " , 404)
    await User.findByIdAndDelete(id)
    res.json({message : "Deleted Account"})
})



 /**---------------------------------
 * @desc      Get User Data
 * @route    /myAccount
 * @method    GET
 * @access    private (only loggedIn himslf)  
 * 
 ----------------------------------*/ 

const GetMyData = catchError(async (req,res)=>{
   const {id}= req.user
   const user = await User.findById(id)
   res.json({user})
})


 /**---------------------------------
 * @desc      Get User profile
 * @route    /profile/:id
 * @method    GET
 * @access    public  
 * 
 ----------------------------------*/ 
const GetProfile = catchError(async(req,res)=>{
   const {id} = req.params
   let user = await User.findById(id)
   if(!user) throw new AppError("user not found" , 404)
   user = await User.findById(id).select('-password -recoveryEmail -role -createdAt -updatedAt')
   res.json({user})
})


 /**---------------------------------
 * @desc      update User password
 * @route    /update-password
 * @method    GET
 * @access    private (only loggedIn himslf)  
 * 
 ----------------------------------*/ 
const updatePassword = catchError(async(req,res)=>{
   const {id}= req.user
   const {oldPassword , newPassowd}= req.body
   let user = await User.findById(id)
   if (!user || !bcrypt.compareSync(oldPassword, user.password)) throw new AppError('Password mismatch', 400)
   const hashed = bcrypt.hashSync(newPassowd , +process.env.SALT)

   await User.findByIdAndUpdate(id,{
      password :hashed
   })
   
  res.json('password updated')

})

const GetAllEmailRecovery = catchError(async (req,res)=>{
  const {email} = req.query
const Email = await User.find({recoveryEmail :email}).select('-password  -role -createdAt -updatedAt')
res.json({Email})
})
 export {
    updateAccount,
    deleteAccount,
    GetMyData,
    GetProfile,
    updatePassword,
    GetAllEmailRecovery
 }