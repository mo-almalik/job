import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppError, catchError } from "../../utils/error.handler.js";
import User from "../user/model/user.model.js";

 /**---------------------------------
 * @desc      Signup New User
 * @route    /singup
 * @method    POST
 * @access    public  
 * 
 ----------------------------------*/ 
 const signup = catchError(async(req,res)=>{
	const {firstName,lastName,email,password,recoveryEmail,dob,mobileNumber} = req.body
	// check if alreedy exixt
	const user = await User.findOne({mobileNumber})
	if(user) return res.status(400).json({message : "user alrady exist"})

	const hashedPassword = bcrypt.hashSync(password , +process.env.SALT)
	await User.create({
		firstName,lastName,email,password : hashedPassword,recoveryEmail,dob,mobileNumber  
	})
	res.json({message:"Seccsseflly Sing Up"})
	
 })


  /**---------------------------------
 * @desc      Signin New User
 * @route    /singin
 * @method    POST
 * @access    public  
 * 
 ----------------------------------*/ 

 const singin = catchError(async(req,res)=>{

	const {email ,password ,mobileNumber} = req.body
	 
	const user = await User.findOne({$or:[{email} ,{mobileNumber}]})
  
	const username = user.firstName + " " + user.lastName

	if (!user || !bcrypt.compareSync(password, user.password)) throw new AppError('Invalid credentials', 400)
	
	user.status = 'online';
    await user.save();
	
	const { role, _id: id } = user
	const token = jwt.sign({ username ,role, id }, process.env.JWT_SECRET ,{expiresIn : process.env.JWT_EXPIRES_IN})
	res.json({ token })
	
 })
 export{
	signup,
	singin
 }