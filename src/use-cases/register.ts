import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

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

  await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password_hash,
    },
  })
}
