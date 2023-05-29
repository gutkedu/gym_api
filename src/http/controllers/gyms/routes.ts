import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { FastifyInstance } from 'fastify'
import { searchGymsController } from './search'
import { nearbyGymsController } from './nearby'
import { createGymController } from './create'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', nearbyGymsController)
  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymController,
  )
}
