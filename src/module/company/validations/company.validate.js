import Joi from 'joi'

export const AddCompanySchema = Joi.object({
	body: {
		email: Joi.string().email().required(),
		numberOfEmployees:Joi.string().required(),
		address: Joi.string().required(),
		name: Joi.string().required().trim(),
		description: Joi.string().required(),
		industry: Joi.string().trim().required(),
	},
	params: {},
	query: {},
})

export const updateCompanySchema = Joi.object({
	body: {
		email: Joi.string().email(),
		numberOfEmployees:Joi.string(),
		address: Joi.string(),
		name: Joi.string().trim(),
		description: Joi.string(),
		industry: Joi.string().trim(),
	},
	params: {
		id:Joi.string().hex().length(24)
	},
	query: {},
})

