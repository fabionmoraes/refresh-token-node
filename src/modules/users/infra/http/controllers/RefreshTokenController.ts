import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RefreshTokenUserService } from '@modules/users/services/RefreshTokenService'

export class RefreshTokenController {
  async create(request: Request, response: Response) {
    const { refreshTokenId } = request.body

    const refreshTokenUserService = container.resolve(RefreshTokenUserService)

    try {
      const result = await refreshTokenUserService.execute(refreshTokenId)

      return response.json(result)
    } catch (err: any) {
      return response.status(400).json({ err: err.message })
    }
  }
}
