import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      name: 'Gym Name',
      description: 'Gym Description',
      phone: '123456789',
      latitude: -27,
      longitude: -49,
    })

    expect(gym.id).toEqual(expect.any(String))
    expect(gym.name).toEqual('Gym Name')
    expect(gym.description).toEqual('Gym Description')
    expect(gym.phone).toEqual('123456789')
  })
})
