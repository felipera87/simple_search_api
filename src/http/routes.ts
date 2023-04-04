import { FastifyInstance } from 'fastify'
import { createSubject } from './controllers/create-subject'

import { searchSubject } from './controllers/search-subject'

export async function routes(app: FastifyInstance) {
  app.get('/subjects/search', searchSubject)
  app.post('/subjects', createSubject)
}
