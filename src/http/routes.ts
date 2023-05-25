import { FastifyInstance } from 'fastify'
import { registerController } from '@/http/controllers/register'
import { authenticateController } from '@/http/controllers/authenticate'
import { profileController } from './controllers/profile'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profileController)
}
