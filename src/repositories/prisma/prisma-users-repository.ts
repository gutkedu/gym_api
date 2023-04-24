import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '@/repositories/prisma/users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newUser = await prisma.user.create({
      data,
    })

    return newUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
