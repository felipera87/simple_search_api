import { InMemorySubjectsRepository } from '@/repositories/in-memory/in-memory-subjects-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchSubjectsUseCase } from './search-subjects'

let subjectsRepository: InMemorySubjectsRepository
let useCase: SearchSubjectsUseCase

describe('Search Subjects Use Case', () => {
  beforeEach(async () => {
    subjectsRepository = new InMemorySubjectsRepository()
    useCase = new SearchSubjectsUseCase(subjectsRepository)
  })

  it('should be able to search for subjects by name', async () => {
    await subjectsRepository.create({
      name: 'JavaScript',
      code: 'JS1',
      description: null,
    })

    await subjectsRepository.create({
      name: 'TypeScript',
      code: 'TS1',
      description: null,
    })

    const { subjects } = await useCase.execute({
      query: 'JavaScript',
    })

    expect(subjects).toHaveLength(1)
    expect(subjects).toEqual([expect.objectContaining({ name: 'JavaScript' })])
  })

  it('should be able to search for subjects by coce', async () => {
    await subjectsRepository.create({
      name: 'JavaScript',
      code: 'JS1',
      description: null,
    })

    await subjectsRepository.create({
      name: 'TypeScript',
      code: 'TS1',
      description: null,
    })

    const { subjects } = await useCase.execute({
      query: 'TS',
    })

    expect(subjects).toHaveLength(1)
    expect(subjects).toEqual([expect.objectContaining({ code: 'TS1' })])
  })

  it('should be able to fetch subjects respecting limit', async () => {
    for (let i = 1; i <= 20; i++) {
      await subjectsRepository.create({
        name: `JavaScript ${i}`,
        code: `JS${i}`,
        description: null,
      })
    }

    const { subjects } = await useCase.execute({
      query: 'JavaScript',
      limit: 5,
    })

    expect(subjects).toHaveLength(5)
    expect(subjects).toEqual([
      expect.objectContaining({ name: 'JavaScript 1' }),
      expect.objectContaining({ name: 'JavaScript 2' }),
      expect.objectContaining({ name: 'JavaScript 3' }),
      expect.objectContaining({ name: 'JavaScript 4' }),
      expect.objectContaining({ name: 'JavaScript 5' }),
    ])
  })
})
