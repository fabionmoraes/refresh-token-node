import { Request, Response } from 'express'
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe'

export class AuthController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)

    try {
      const result = await authenticateUserService.execute({
        email,
        password,
      })

      return response.json(result)
    } catch (err: any) {
      return response.status(401).json({ err: err.message })
    }
  }
}
