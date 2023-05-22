import { expect, describe, it, beforeEach, afterEach } from 'vitest'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInssRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: ICheckInsRepository

let sut: ValidateCheckInUseCase

describe('Validate check in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInssRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able validate the check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.findById(createdCheckIn.id)).resolves.toEqual(
      expect.objectContaining({
        validated_at: expect.any(Date),
      }),
    )
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'invalid-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
