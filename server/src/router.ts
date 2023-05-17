import { z } from 'zod'

import type { FastifyInstance, FastifyRequest } from 'fastify'

import MemoriaRouter from './memories/router'
import UsuarioRouter from './users/router'

const olaMundo = () => {
  return 'Ola Mundo!'
}

const echo = (request: FastifyRequest) => {
  return z
    .object({
      echo: z.string(),
    })
    .parse(request.params)
}

const ping = (request: FastifyRequest) => {
  return z
    .object({
      pong: z.string().default('pong'),
    })
    .parse(request.query)
}

const Router = async (app: FastifyInstance) => {
  app.get('/', () => 'Server: Executando - OK')

  app.get('/ola-mundo', olaMundo)
  app.get('/hello-world', olaMundo)
  app.get('/世界', olaMundo)

  app.get('/ping', ping)
  app.get('/echo/:echo', echo)

  UsuarioRouter(app)
  MemoriaRouter(app)
}

export default Router
