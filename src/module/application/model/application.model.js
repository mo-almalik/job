import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  userTechSkills: {
    type: [String],
    default: [],
  },
  userSoftSkills: {
    type: [String],
    default: [],
  },
  userResume: {
    type: String, // Assuming the URL or path to the uploaded PDF on Cloudinary
    required: true,
  },
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
