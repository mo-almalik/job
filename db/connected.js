import mongoose from "mongoose";
const dbconnect= ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
       
    }).catch()
}

export default dbconnect