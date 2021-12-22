import { CreateUserDto } from '../dtos/CreateUserDto'
import { IUser } from '../infra/prisma/PrismaUserRepo'

export interface IUserRepository {
  create(data: CreateUserDto): Promise<IUser>
  findOneById(id: string): Promise<IUser | null>
  findOneByEmail(email: string): Promise<IUser | null>
  findAll(): Promise<IUser[]>
}
