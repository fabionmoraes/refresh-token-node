import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/IUserRepository'

@injectable()
export class FindOneUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(user_id: string) {
    const user = await this.userRepository.findOneById(user_id)

    return user
  }
}
