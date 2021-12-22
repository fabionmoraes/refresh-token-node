import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const authRoutes = Router()
const authController = new AuthController()

authRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email(),
      password: Joi.string().min(6),
    },
  }),
  authController.create
)

export { authRoutes }
