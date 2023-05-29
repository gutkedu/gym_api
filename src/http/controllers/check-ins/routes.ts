import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { FastifyInstance } from 'fastify'
import { createCheckInController } from './create'
import { validateCheckInController } from './validate'
import { checkInsHistoryController } from './history'
import { getUserMetricsController } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', checkInsHistoryController)
  app.get('/check-ins/metrics', getUserMetricsController)

  app.post('/gyms/:gymId/check-ins', createCheckInController)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckInController,
  )
}
