import { Router } from 'express'
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes'
import { authRoutes } from '@modules/users/infra/http/routes/auth.routes'
import { refreshTokenRoutes } from '@modules/users/infra/http/routes/refreshToken.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/auth', authRoutes)
routes.use('/refresh-token', refreshTokenRoutes)

export { routes }
