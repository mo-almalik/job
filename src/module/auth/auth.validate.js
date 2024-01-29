import Joi from 'joi'

export const signinSchema = Joi.object({
	body: {
		email: Joi.string().email(),
		mobileNumber:Joi.number(),
		password: Joi.string().required(),
	},
	params: {},
	query: {},
})

export const signupSchema = Joi.object({
	body: {

		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }, }).required(),
		recoveryEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }, }).required(),
		password: Joi.string().required(),
		mobileNumber: Joi.number().required(),
		dob: Joi.string().required()
		// pattern(/^\d{4}-\d{2}-\d{2}$/)

	},
	params: {},
	query: {},
})

