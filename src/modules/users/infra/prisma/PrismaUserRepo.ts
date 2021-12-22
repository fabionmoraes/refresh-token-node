import { client } from '@shared/infra/prisma/client'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@prisma/client'
import { CreateUserDto } from '@modules/users/dtos/CreateUserDto'
import { bcryptPassword } from '@config/bcrypt'

interface IUser extends User {}

class PrismaUserRepo implements IUserRepository {
  async create(data: CreateUserDto): Promise<IUser> {
    const password = await bcryptPassword(data.password)

    const user = await client.user.create({
      data: {
        ...data,
        password,
      },
    })

    delete user.password

    return user
  }

  async findOneById(id: string): Promise<IUser | null> {
    const user = await client.user.findFirst({
      where: { id },
    })

    return user
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    const user = await client.user.findFirst({
      where: { email },
    })

    return user
  }

  async findAll(): Promise<IUser[]> {
    const users = await client.user.findMany()

    return users
  }
}

export { PrismaUserRepo, IUser }
