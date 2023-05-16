import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInssRepository } from '@/repositories/in-memory/in-memory-checkins-repository'

let checkInsRepository: ICheckInsRepository
let sut: CheckInUseCase

describe('Check in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInssRepository()
    sut = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual('gym-id')
    expect(checkIn.user_id).toEqual('user-id')
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice on different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
