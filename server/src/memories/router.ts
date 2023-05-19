import { FastifyInstance } from 'fastify'

import {
  atualizar,
  consultar,
  consultarPorId,
  criar,
  excluir,
} from './controller'

const MemoriaRouter = (app: FastifyInstance) => {
  app.post('/upload', updload)
  app.get('/memorias', consultar)
  app.get('/memorias/:id', consultarPorId)
  app.post('/memorias', criar)
  app.put('/memorias/:id', atualizar)
  app.delete('/memorias/:id', excluir)
}

export default MemoriaRouter
