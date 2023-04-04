import { Subject, Prisma } from '@prisma/client'

export interface SubjectsRepository {
  searchManyByNameOrCode(query: string, limit: number): Promise<Subject[]>
  create(data: Prisma.SubjectCreateInput): Promise<Subject>
  findByCode(code: string): Promise<Subject | null>
}
