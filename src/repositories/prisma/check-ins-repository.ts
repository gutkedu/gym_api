import { Prisma, CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

export class CheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const newCheckIn = await prisma.checkIn.create({
      data,
    })

    return newCheckIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: date,
          lte: date,
        },
      },
    })

    return checkIn
  }
}
