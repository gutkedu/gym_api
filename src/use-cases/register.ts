import { IUsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    payload: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(payload.password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(
      payload.email,
    )

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const newUser = await this.usersRepository.create({
      email: payload.email,
      name: payload.name,
      password_hash,
    })

    return {
      user: newUser,
    }
  }
}
