import { PrismaSubjectsRepository } from '@/repositories/prisma/prisma-subjects-repository'
import { SearchSubjectsUseCase } from '../search-subjects'

export function makeSearchSubjectsUseCase() {
  const subjectsRepository = new PrismaSubjectsRepository()
  const useCase = new SearchSubjectsUseCase(subjectsRepository)

  return useCase
}
