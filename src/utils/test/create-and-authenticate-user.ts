import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const user = await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'senha@12345!',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: 'senha@12345!',
  })

  const { token } = authResponse.body as { token: string }

  return {
    token,
    user,
  }
}
