import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInssRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { IGymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Gym } from '@prisma/client'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance.error'

let checkInsRepository: ICheckInsRepository
let gymsRepository: IGymsRepository
let sut: CheckInUseCase
let createdGym: Gym

describe('Check in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInssRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    createdGym = await gymsRepository.create({
      name: 'Gym Name',
      description: 'Gym Description',
      phone: '123456789',
      latitude: -27,
      longitude: -49,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: createdGym.id,
      userId: 'user-id',
      userLatitude: -27,
      userLongitude: -49,
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual(createdGym.id)
    expect(checkIn.user_id).toEqual('user-id')
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: createdGym.id,
      userId: 'user-id',
      userLatitude: -27,
      userLongitude: -49,
    })

    await expect(async () => {
      await sut.execute({
        gymId: createdGym.id,
        userId: 'user-id',
        userLatitude: -27,
        userLongitude: -49,
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice on different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: createdGym.id,
      userId: 'user-id',
      userLatitude: -27,
      userLongitude: -49,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: createdGym.id,
      userId: 'user-id',
      userLatitude: -27,
      userLongitude: -49,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in for a distant gym', async () => {
    const distantGym = await gymsRepository.create({
      name: 'Gym 2',
      description: 'Gym Description 2',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: distantGym.id,
        userId: 'user-id',
        userLatitude: -27,
        userLongitude: -49,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
