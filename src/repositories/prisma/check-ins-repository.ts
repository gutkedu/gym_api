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
}
