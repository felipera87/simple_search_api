import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchSubjectsUseCase } from '@/use-cases/factories/make-search-subjects-use-case'

export async function searchSubject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchSubjectsQuerySchema = z.object({
    q: z.string().nullable().default(null),
    limit: z.coerce.number().min(1).default(10),
  })

  const { q, limit } = searchSubjectsQuerySchema.parse(request.query)

  const searchSubjectsUseCase = makeSearchSubjectsUseCase()

  const { subjects } = await searchSubjectsUseCase.execute({
    query: q,
    limit,
  })

  return reply.status(200).send({
    subjects,
  })
}
