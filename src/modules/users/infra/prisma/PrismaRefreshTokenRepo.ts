import dayjs from 'dayjs'

import { IRefreshTokenRepository } from '@modules/users/repositories/IRefreshTokenRepository'
import { RefreshToken } from '@prisma/client'
import { client } from '@shared/infra/prisma/client'
import { IUser } from './PrismaUserRepo'

interface IRefreshToken extends RefreshToken {
  user: IUser
}

class PrismaRefreshTokenRepo implements IRefreshTokenRepository {
  async findOneById(id: string): Promise<IRefreshToken | null> {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })

    return refreshToken
  }

  async create(user_id: string): Promise<RefreshToken> {
    const expireIn = dayjs().add(120, 'second').unix()

    return await client.refreshToken.create({
      data: {
        user_id,
        expireIn,
      },
    })
  }

  async deleteMany(user_id: string): Promise<void> {
    await client.refreshToken.deleteMany({
      where: {
        user_id,
      },
    })
  }
}

export { PrismaRefreshTokenRepo, IRefreshToken }
