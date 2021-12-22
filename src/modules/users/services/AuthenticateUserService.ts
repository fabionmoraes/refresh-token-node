import { AppError } from '@config/AppError'
import { bcryptCompare } from '@config/bcrypt'
import { jwtConfig } from '@config/jwt'
import { inject, injectable } from 'tsyringe'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'
import { IUserRepository } from '../repositories/IUserRepository'

interface IRequest {
  email: string
  password: string
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(data: IRequest) {
    const { email, password } = data

    const user = await this.userRepository.findOneByEmail(email)

    if (!user) {
      throw new AppError('Ops! Senha ou Email Invalido', 401)
    }

    const isMatch = await bcryptCompare(password, String(user.password))

    if (!isMatch) {
      throw new AppError('Ops! Senha ou Email Invalido', 401)
    }

    const token = jwtConfig(user)

    await this.refreshTokenRepository.deleteMany(user.id)

    const refreshToken = await this.refreshTokenRepository.create(user.id)

    return { token, refreshToken }
  }
}
