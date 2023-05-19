import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import files from '@fastify/static'
import fastify from 'fastify'

import Router from './router'

const opts: any = { host: '0.0.0.0', port: process.env.port || 3333 }
const app = fastify()

app.register(cors, {
  origin: ['http://localhost:3000'],
})

app.register(jwt, {
  secret: process.env.SECRET || 'LmJq3Pf5tmWd66Em7',
})

app.register(multipart)
app.register(files, {
  root: '/uploads',
  prefix: '/uploads',
})

app.register(Router)

app.listen(opts).then((addr) => console.log('Servidor: Executando em', addr))
