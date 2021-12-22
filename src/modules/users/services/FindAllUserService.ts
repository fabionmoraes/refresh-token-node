import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/IUserRepository'

@injectable()
export class FindAllUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute() {
    const users = await this.userRepository.findAll()

    return users
  }
}
