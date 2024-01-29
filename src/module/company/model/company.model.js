import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  numberOfEmployees: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate the number of employees format (e.g., 11-20)
        const regex = /^\d+-\d+$/;
        return regex.test(value);
      },
      message: 'Invalid number of employees format. Use range like 11-20.',
    },
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  companyHR: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
});

const Company = mongoose.model('Company', companySchema);


export default Company;
