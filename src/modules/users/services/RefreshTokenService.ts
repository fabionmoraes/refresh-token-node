import dayjs from 'dayjs'
import { inject, injectable } from 'tsyringe'

import { IRefreshTokenRepository } from '@modules/users/repositories/IRefreshTokenRepository'

import { AppError } from '@config/AppError'
import { jwtConfig } from '@config/jwt'

@injectable()
export class RefreshTokenUserService {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepo: IRefreshTokenRepository
  ) {}

  async execute(refresh_token: string) {
    const refreshToken = await this.refreshTokenRepo.findOneById(refresh_token)

    if (!refreshToken) {
      throw new AppError('Refresh token invalid')
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expireIn)
    )

    const user = refreshToken.user

    const token = jwtConfig(user)

    if (refreshTokenExpired) {
      await this.refreshTokenRepo.deleteMany(refreshToken.user_id)

      const newRefreshToken = await this.refreshTokenRepo.create(
        refreshToken.user_id
      )

      return { token, refreshToken: newRefreshToken }
    }

    delete refreshToken.user

    return { token, refreshToken }
  }
}
