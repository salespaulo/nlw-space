import cors from '@fastify/cors'
import fastify from 'fastify'

import Router from './router'

const opts: any = { port: process.env.port || 3333 }
const app = fastify()

app.register(cors, {
  origin: ['http://localhost:3000'],
})

app.register(Router)

app.listen(opts).then((addr) => console.log('Servidor: Executando em', addr))
