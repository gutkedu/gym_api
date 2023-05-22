import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-repository'

interface SearchGymRequest {
  query: string
  page: number
}

interface SearchGymResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
