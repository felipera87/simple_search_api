import { Subject, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { SubjectsRepository } from '../subjects-repository'

export class InMemorySubjectsRepository implements SubjectsRepository {
  public items: Subject[] = []

  async findByCode(code: string) {
    return this.items.find((item) => item.code === code) ?? null
  }

  async searchManyByNameOrCode(query: string, limit: number) {
    return this.items
      .filter((item) => item.name.includes(query) || item.code.includes(query))
      .slice(0, limit)
  }

  async create(data: Prisma.SubjectCreateInput) {
    const subject = {
      id: data.id ?? randomUUID(),
      name: data.name,
      code: data.code,
      description: data.description ?? null,
      created_at: new Date(),
    }

    this.items.push(subject)

    return subject
  }
}
