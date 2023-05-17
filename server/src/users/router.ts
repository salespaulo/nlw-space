import { FastifyInstance } from 'fastify'

import {
  atualizar,
  consultar,
  consultarPorId,
  criar,
  excluir,
} from './controller'

const UsuarioRouter = (app: FastifyInstance) => {
  app.get('/usuarios/:id', consultarPorId)
  app.get('/usuarios', consultar)
  app.post('/usuarios', criar)
  app.put('/usuarios/:id', atualizar)
  app.delete('/usuarios/:id', excluir)
}

export default UsuarioRouter
