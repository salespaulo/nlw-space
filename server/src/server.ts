import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

const opts: any = { port: process.env.port || 3333 }

const olaMundo = () => {
  return 'Ola mundo!'
}

const getUsuarios = async () => {
  return await prisma.user.findMany()
}

app.get('/usuarios', getUsuarios)
app.get('/ola-mundo', olaMundo)

app.get('/hello-world', olaMundo)
app.get('/世界', olaMundo)

app
  .listen(opts)
  .then(() => console.log('Servidor HTTP executando na opts=', opts))
