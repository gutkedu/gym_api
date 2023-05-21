import { expect, describe, it, beforeEach } from 'vitest'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInssRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchUserCheckInsUseCase } from './fetch-user-check-ins.history'

let checkInsRepository: ICheckInsRepository
let sut: FetchUserCheckInsUseCase

describe('Fetch user check in history use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInssRepository()
    sut = new FetchUserCheckInsUseCase(checkInsRepository)
  })

  it('should be able to fetch user check in history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    await checkInsRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns.length).toBe(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id' }),
      expect.objectContaining({ gym_id: 'gym-id-2' }),
    ])
  })

  it('should be able to paginate the user check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 2,
    })

    expect(checkIns.length).toBe(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})
