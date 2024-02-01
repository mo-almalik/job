import Joi from 'joi'

export const AddjobSchema = Joi.object({
	body: {
		jobTitle: Joi.string().required(),
		jobLocation:Joi.string().required(),
		workingTime: Joi.string().required(),
		seniorityLevel: Joi.string().required(),
		jobDescription: Joi.string().required(),
		technicalSkills: Joi.array().required(),
		softSkills: Joi.array().required(),
	},
	params: {},
	query: {},
})

export const updatejobSchema = Joi.object({
	body: {
		jobTitle: Joi.string(),
		jobLocation:Joi.string(),
		workingTime: Joi.string(),
		seniorityLevel: Joi.string(),
		jobDescription: Joi.string(),
		technicalSkills: Joi.array(),
		softSkills: Joi.array(),
	},
	params: {
		id:Joi.string().hex().length(24)
	},
	query: {},
})

export const deletejobSchema = Joi.object({
	body: {},
	params: {
		id:Joi.string().hex().length(24)
	},
	query: {},
})

export const GetJobsOneCompanySchema = Joi.object({
	body: {},
	params: {},
	query: {
		name:Joi.string().trim().required()
	},
})
