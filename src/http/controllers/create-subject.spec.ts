import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Subject (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a subject', async () => {
    const response = await request(app.server).post('/subjects').send({
      name: 'JavaScript',
      code: 'JS',
      description: 'Some description.',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create two subjects with same code', async () => {
    await request(app.server).post('/subjects').send({
      name: 'JavaScript',
      code: 'JS',
      description: 'Some description.',
    })

    const response = await request(app.server).post('/subjects').send({
      name: 'JavaScript',
      code: 'JS',
      description: 'Some description.',
    })

    expect(response.statusCode).toEqual(409)
  })
})
