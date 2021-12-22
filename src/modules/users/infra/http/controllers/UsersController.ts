import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CreateUserService } from '@modules/users/services/CreateUserService'
import { FindOneUserByIdService } from '@modules/users/services/FindOneUserByIdService'
import { FindAllUserService } from '@modules/users/services/FindAllUserService'

export class UsersController {
  async findAll(request: Request, response: Response) {
    const findAllUserService = container.resolve(FindAllUserService)

    const result = await findAllUserService.execute()

    return response.json(result)
  }

  async findOneById(request: Request, response: Response) {
    const { id } = request.params

    const findOneUserByIdService = container.resolve(FindOneUserByIdService)

    const result = await findOneUserByIdService.execute(id)

    return response.json(result)
  }

  async create(request: Request, response: Response) {
    try {
      const { confirmed_password, email, name, password } = request.body

      const createUserService = container.resolve(CreateUserService)

      const result = await createUserService.execute({
        email,
        name,
        password,
        confirmed_password,
      })

      return response.status(201).json(result)
    } catch (err: any) {
      return response.status(401).json({ err: err.message })
    }
  }
}
