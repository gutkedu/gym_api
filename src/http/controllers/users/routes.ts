import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { FastifyInstance } from 'fastify'

import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { registerController } from './register'
import { refreshController } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profileController)
}
