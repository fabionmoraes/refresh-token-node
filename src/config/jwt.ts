import { sign, verify } from 'jsonwebtoken'
import { IUser } from '@modules/users/infra/prisma/PrismaUserRepo'

interface IPayload {
  sub: string
}

export const jwtConfig = (user: IUser) => {
  const token = sign(
    {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    },
    String(process.env.JWT_SECRET),
    {
      subject: String(user.id),
      expiresIn: '20s',
    }
  )

  return token
}

export const jwtVerify = (token: string): string => {
  const { sub } = verify(token, String(process.env.JWT_SECRET)) as IPayload
  return sub
}
