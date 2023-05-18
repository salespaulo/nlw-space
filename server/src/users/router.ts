import { FastifyInstance, FastifyRequest } from 'fastify'

import { oauth, oauthMobile } from './controller'

const UsuarioRouter = (app: FastifyInstance) => {
  app.post('/usuarios/oauth/m', async (req: FastifyRequest) => {
    const user = await oauthMobile(req)
    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return { token }
  })
  app.post('/usuarios/oauth', async (req: FastifyRequest) => {
    const user = await oauth(req)
    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return { token }
  })
}

export default UsuarioRouter
