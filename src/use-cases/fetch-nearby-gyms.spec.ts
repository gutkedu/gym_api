import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('fetch nearby gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near gym',
      description: 'Gym Description',
      phone: '123456789',
      latitude: -27.01,
      longitude: -49.01,
    })

    await gymsRepository.create({
      name: 'Far gym',
      description: 'Gym Description 2',
      phone: '123456789',
      latitude: -27.5,
      longitude: -49.5,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27,
      userLongitude: -49,
    })

    expect(gyms.length).toBe(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near gym' })])
  })
})
