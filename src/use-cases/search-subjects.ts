import { SubjectsRepository } from '@/repositories/subjects-repository'
import { Subject } from '@prisma/client'

interface SearchSubjectsUseCaseRequest {
  query: string | null
  limit?: number
}

interface SearchSubjectsUseCaseResponse {
  subjects: Subject[]
}

export class SearchSubjectsUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({
    query,
    limit,
  }: SearchSubjectsUseCaseRequest): Promise<SearchSubjectsUseCaseResponse> {
    const subjects = await this.subjectsRepository.searchManyByNameOrCode(
      query ?? '',
      limit ?? 10,
    )

    return {
      subjects,
    }
  }
}
