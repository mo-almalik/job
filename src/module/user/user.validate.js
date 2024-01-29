import Joi from 'joi'

export const updateAccountSchema = Joi.object({
	body: {
		email: Joi.string().email(),
		mobileNumber:Joi.number(),
		password: Joi.string().required(),
	},
	params: {},
	query: {},
})

export const deleteAccountSchema = Joi.object({
	body: {},
	params: {
        id:Joi.string().trim().hex().length(24).required()
    },
	query: {},
})