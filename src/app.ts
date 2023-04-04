import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from '@/env'
import { routes } from './http/routes'

export const app = fastify()

app.register(cors, {
  origin: (_origin, cb) => {
    // TODO: Fix this when deploying to production, should not allow everything
    cb(null, true)
  },
})

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
