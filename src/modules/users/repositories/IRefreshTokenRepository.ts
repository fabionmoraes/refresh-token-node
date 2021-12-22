import { RefreshToken } from '@prisma/client'
import { IRefreshToken } from '../infra/prisma/PrismaRefreshTokenRepo'

export interface IRefreshTokenRepository {
  findOneById(id: string): Promise<IRefreshToken | null>
  create(user_id: string): Promise<RefreshToken>
  deleteMany(user_id: string): Promise<void>
}
