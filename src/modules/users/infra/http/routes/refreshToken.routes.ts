import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { RefreshTokenController } from '../controllers/RefreshTokenController'

const refreshTokenRoutes = Router()
const refreshTokenController = new RefreshTokenController()

refreshTokenRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      refreshTokenId: Joi.string().required(),
    },
  }),
  refreshTokenController.create
)

export { refreshTokenRoutes }
