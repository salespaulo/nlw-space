import { z } from 'zod'

import type { FastifyReply, FastifyRequest } from 'fastify'

import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { prisma } from '../lib/prisma'

const pump = promisify(pipeline)

export const validarId = z.object({
  id: z.string().uuid(),
})

export const validarMemoria = z.object({
  content: z.string(),
  coverUrl: z.string().url(),
  isPublic: z.coerce.boolean().default(false),
})

export const consultar = async (request: FastifyRequest) => {
  await request.jwtVerify()

  const list = await prisma.memory.findMany({
    where: {
      userId: request.user.sub,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const result = list.map((m) => ({
    id: m.id,
    coverUrl: m.coverUrl,
    excerpt: m.content.substring(0, 115).concat('...'),
    createdAt: m.createdAt,
  }))

  return result
}

export const consultarPorId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await request.jwtVerify()
  const { id } = validarId.parse(request.params)

  const memory = await prisma.memory.findUniqueOrThrow({
    where: { id },
  })

  if (memory.isPublic || memory.userId === request.user.sub) {
    return memory
  }

  return reply.status(401).send('Unauthorized')
}

export const criar = async (request: FastifyRequest) => {
  await request.jwtVerify()
  const { content, coverUrl, isPublic } = validarMemoria.parse(request.body)

  return await prisma.memory.create({
    data: {
      content,
      coverUrl,
      isPublic,
      userId: request.user.sub,
    },
  })
}

export const atualizar = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await request.jwtVerify()
  const { id } = validarId.parse(request.params)
  const { content, coverUrl, isPublic } = validarMemoria.parse(request.params)

  const memory = await prisma.memory.findFirstOrThrow({
    where: {
      id,
    },
  })

  if (memory.isPublic || memory.id === request.user.sub) {
    return await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
  }

  return reply.status(401).send('Unauthorized')
}

export const excluir = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify()
  const { id } = validarId.parse(request.params)

  const memory = await prisma.memory.findFirstOrThrow({
    where: {
      id,
    },
  })

  if (memory.id === request.user.sub) {
    return await prisma.memory.delete({ where: { id } })
  }

  return reply.status(401).send('Unauthorized')
}

export const upload = async (request: FastifyRequest, reply: FastifyReply) => {
  const upload = await request.file({
    limits: {
      fileSize: 5_242_880, // 5Mb
    },
  })

  if (!upload) {
    return reply.status(400).send('Upload invalid')
  }

  try {
    const fileRegex = /^(image|video)\/[a-zA-Z]+/
    const fileIsValid = fileRegex.test

    if (!fileIsValid) {
      return reply.status(400).send('Upload invalid')
    }

    const fileId = randomUUID()
    const fileExt = extname(upload.filename)
    const fileName = fileId.concat(fileExt)
    const fileAbsolute = resolve(__dirname, '..', '..', 'uploads', fileName)
    const writeStream = createWriteStream(fileAbsolute)

    await pump(upload.file, writeStream)

    const fileHttp = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fileHttp).toString()

    return reply.status(200).send({ fileUrl })
  } catch (e) {
    console.error(e)
    return reply.status(500).send(e)
  }
}
