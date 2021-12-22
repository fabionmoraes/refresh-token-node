import { container } from 'tsyringe'

import { IUserRepository } from './modules/users/repositories/IUserRepository'
import { PrismaUserRepo } from './modules/users/infra/prisma/PrismaUserRepo'

import { IRefreshTokenRepository } from './modules/users/repositories/IRefreshTokenRepository'
import { PrismaRefreshTokenRepo } from './modules/users/infra/prisma/PrismaRefreshTokenRepo'

container.registerSingleton<IUserRepository>('UserRepository', PrismaUserRepo)
container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  PrismaRefreshTokenRepo
)
