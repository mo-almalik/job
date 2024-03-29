import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim:true
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
       
        const regex = /^\d+-\d+$/;
        return regex.test(value);
      },
      message: 'Invalid number of employees format. Use range like 11-20.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  HR: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});

const Company = mongoose.model('Company', companySchema);


export default Company;
