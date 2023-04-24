import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase(
  payload: RegisterUseCaseRequest,
): Promise<void> {
  const password_hash = await hash(payload.password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('User already exists')
  }

  const usersRepository = new PrismaUsersRepository()

  await usersRepository.create({
    email: payload.email,
    name: payload.name,
    password_hash,
  })
}
