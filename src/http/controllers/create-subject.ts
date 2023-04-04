import { SubjectAlreadyExistsError } from '@/use-cases/errors/subject-already-exists-error'
import { makeCreateSubjectUseCase } from '@/use-cases/factories/make-create-subject-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createSubject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSubjectBodySchema = z.object({
    name: z.string(),
    code: z.string(),
    description: z.string().nullable().optional(),
  })

  const { name, code, description } = createSubjectBodySchema.parse(
    request.body,
  )

  const createSubjectUseCase = makeCreateSubjectUseCase()

  try {
    const { subject } = await createSubjectUseCase.execute({
      name,
      code,
      description: description ?? null,
    })

    return reply.status(201).send({
      subject,
    })
  } catch (err) {
    if (err instanceof SubjectAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
