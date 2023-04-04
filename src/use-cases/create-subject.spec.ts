import { InMemorySubjectsRepository } from '@/repositories/in-memory/in-memory-subjects-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateSubjectUseCase } from './create-subject'
import { SubjectAlreadyExistsError } from './errors/subject-already-exists-error'

let subjectsRepository: InMemorySubjectsRepository
let useCase: CreateSubjectUseCase

describe('Create Subject Use Case', () => {
  beforeEach(() => {
    subjectsRepository = new InMemorySubjectsRepository()
    useCase = new CreateSubjectUseCase(subjectsRepository)
  })

  it('should create subject', async () => {
    const { subject } = await useCase.execute({
      name: 'JavaScript',
      code: 'JS',
      description: null,
    })

    expect(subject.id).toEqual(expect.any(String))
  })

  it('should not be able to create subject with same code twice', async () => {
    const code = 'JS'

    await useCase.execute({
      name: 'JavaScript',
      code,
      description: null,
    })

    await expect(() =>
      useCase.execute({
        name: 'JavaScript',
        code,
        description: null,
      }),
    ).rejects.toBeInstanceOf(SubjectAlreadyExistsError)
  })
})
