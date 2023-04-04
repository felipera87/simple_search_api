import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, afterEach, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Search Subjects (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    await prisma.subject.deleteMany({})
  })

  it('should be able to search subjects with no query', async () => {
    await Promise.all(
      new Array(5).fill('JavaScript ').map((subject, index) => {
        return request(app.server)
          .post('/subjects')
          .send({
            name: `${subject} ${index + 1}`,
            code: `JS ${index + 1}`,
          })
      }),
    )
    const response = await request(app.server).get('/subjects/search').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.subjects).toHaveLength(5)
  })

  it('should be able to search subjects by name', async () => {
    await request(app.server).post('/subjects').send({
      name: 'JavaScript',
      code: 'JS',
      description: 'Some description.',
    })

    await request(app.server).post('/subjects').send({
      name: 'TypeScript',
      code: 'TS',
      description: 'Some description.',
    })

    const response = await request(app.server)
      .get('/subjects/search')
      .query({
        q: 'JavaScript',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.subjects).toHaveLength(1)
    expect(response.body.subjects).toEqual([
      expect.objectContaining({
        name: 'JavaScript',
      }),
    ])
  })

  it('should be able to search subjects by code', async () => {
    await request(app.server).post('/subjects').send({
      name: 'JavaScript',
      code: 'JS',
      description: 'Some description.',
    })

    await request(app.server).post('/subjects').send({
      name: 'TypeScript',
      code: 'TS',
      description: 'Some description.',
    })

    const response = await request(app.server)
      .get('/subjects/search')
      .query({
        q: 'TS',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.subjects).toHaveLength(1)
    expect(response.body.subjects).toEqual([
      expect.objectContaining({
        code: 'TS',
      }),
    ])
  })
})
