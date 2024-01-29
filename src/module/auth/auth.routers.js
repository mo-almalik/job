import { Router } from 'express'
import { signup, singin} from './auth.controller.js'
import { assertUniqueEmail } from './auth.middlewares.js'
import { validate } from '../../middlewares/validation.middleware.js'
import {
	signinSchema,
	signupSchema,
} from './auth.validate.js'

const router = Router()


router.post('/register', validate(signupSchema), assertUniqueEmail, signup)
router.post('/login',validate(signinSchema), singin)


export default router
