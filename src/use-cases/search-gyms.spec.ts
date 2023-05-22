import { expect, describe, it, beforeEach } from 'vitest'

import { SearchGymUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Gym Name',
      description: 'Gym Description',
      phone: '123456789',
      latitude: -27,
      longitude: -49,
    })

    await gymsRepository.create({
      name: 'Gym Name 2',
      description: 'Gym Description 2',
      phone: '123456789',
      latitude: -27,
      longitude: -49,
    })

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms.length).toBe(2)
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Gym Name ${i}`,
        description: 'Gym Description',
        phone: '123456789',
        latitude: -27,
        longitude: -49,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms.length).toBe(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym Name 21' }),
      expect.objectContaining({ name: 'Gym Name 22' }),
    ])
  })
})
