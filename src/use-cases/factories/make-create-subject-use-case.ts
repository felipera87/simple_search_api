import { PrismaSubjectsRepository } from '@/repositories/prisma/prisma-subjects-repository'
import { CreateSubjectUseCase } from '../create-subject'

export function makeCreateSubjectUseCase() {
  const subjectsRepository = new PrismaSubjectsRepository()
  const useCase = new CreateSubjectUseCase(subjectsRepository)

  return useCase
}
