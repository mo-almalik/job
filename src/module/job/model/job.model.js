import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    enum: ['onsite', 'remotely', 'hybrid'],
    required: true,
    trim:true
  },
  workingTime: {
    type: String,
    enum: ['part-time', 'full-time'],
    required: true,
  },
  seniorityLevel: {
    type: String,
    enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  technicalSkills: {
    type: [String],
    default: [],
  },
  softSkills: {
    type: [String],
    default: [],
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
