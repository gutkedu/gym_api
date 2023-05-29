import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('it should be able search gyms by name', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Academia do Zé',
        description: 'Descrição da Academia do Zé',
        phone: '123456789',
        latitude: -27.1,
        longitude: -49.64,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Academia do Du',
        description: 'Descrição da Academia do Du',
        phone: '123456789',
        latitude: -27.1,
        longitude: -49.64,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Zé',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Academia do Zé',
      }),
    ])
  })
})
