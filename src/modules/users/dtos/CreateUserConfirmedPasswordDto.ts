import { CreateUserDto } from './CreateUserDto'

export interface CreateUserConfirmedPasswordDto extends CreateUserDto {
  confirmed_password: string
}
