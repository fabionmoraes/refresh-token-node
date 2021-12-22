import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { UsersController } from '../controllers/UsersController'
import { ensureAuthenticated } from 'middleware/ensureAuthenticated'

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
      confirmed_password: Joi.string().min(6),
    },
  }),
  usersController.create
)

usersRoutes.use(ensureAuthenticated)

usersRoutes.get('/', usersController.findAll)
usersRoutes.get('/:id', usersController.findOneById)

export { usersRoutes }
