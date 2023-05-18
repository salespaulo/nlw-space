import { z } from 'zod'

import type { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../lib/prisma'

export const validarId = z.object({
  id: z.string().uuid(),
})

export const validarMemoria = z.object({
  content: z.string(),
  coverUrl: z.string().url(),
  isPublic: z.coerce.boolean().default(false),
})

export const consultar = async (request: FastifyRequest) => {
  return await prisma.memory.findMany({
    where: {
      id: request.user.sub,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}

export const consultarPorId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await req.jwtVerify()
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
  await req.jwtVerify()
  const { content, coverUrl, isPublic } = validarMemoria.parse(request.params)

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
  await req.jwtVerify()
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
  await req.jwtVerify()
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
