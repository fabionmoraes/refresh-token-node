import { AppError } from '@config/AppError'
import { inject, injectable } from 'tsyringe'
import { CreateUserConfirmedPasswordDto } from '../dtos/CreateUserConfirmedPasswordDto'
import { IUserRepository } from '../repositories/IUserRepository'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserConfirmedPasswordDto) {
    const { confirmed_password, email, name, password } = data

    if (password !== confirmed_password) {
      throw new AppError('Ops! A senha não bate.', 401)
    }

    const result = await this.userRepository.create({
      email,
      name,
      password,
    })

    return result
  }
}
