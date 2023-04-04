import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { SubjectsRepository } from '../subjects-repository'

export class PrismaSubjectsRepository implements SubjectsRepository {
  async findByCode(code: string) {
    const subject = await prisma.subject.findUnique({
      where: {
        code,
      },
    })

    return subject
  }

  async searchManyByNameOrCode(query: string, limit: number) {
    const subjects = await prisma.subject.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            code: {
              contains: query,
            },
          },
        ],
      },
      take: limit,
    })

    return subjects
  }

  async create(data: Prisma.SubjectCreateInput) {
    const subject = await prisma.subject.create({
      data,
    })

    return subject
  }
}
