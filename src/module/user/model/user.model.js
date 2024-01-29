import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recoveryEmail: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Validate date format (YYYY-MM-DD)
        // const regex = /^\d{4}-\d{2}-\d{2}$/;
        // return regex.test(value);
      },
      message: 'Invalid date format. Use YYYY-MM-DD.',
    },
  },
  mobileNumber: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ['USER', 'HR'],
    default: 'USER',
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  },
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User
