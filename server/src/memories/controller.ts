import { z } from 'zod'

import type { FastifyRequest } from 'fastify'

import { prisma } from '../lib/prisma'

export const validarId = z.object({
  id: z.string().uuid(),
})

export const validarMemoria = z.object({
  content: z.string(),
  coverUrl: z.string().url(),
  isPublic: z.coerce.boolean().default(false),
  userId: z.string().uuid(),
})

export const consultar = async () => {
  return await prisma.memory.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })
}

export const consultarPorId = async (request: FastifyRequest) => {
  const { id } = validarId.parse(request.params)
  return await prisma.memory.findUniqueOrThrow({ where: { id } })
}

export const criar = async (request: FastifyRequest) => {
  const { content, coverUrl, isPublic, userId } = validarMemoria.parse(
    request.params,
  )

  return await prisma.memory.create({
    data: {
      content,
      coverUrl,
      isPublic,
      userId,
    },
  })
}

export const atualizar = async (request: FastifyRequest) => {
  const { id } = validarId.parse(request.params)
  const { content, coverUrl, isPublic } = validarMemoria.parse(request.params)

  return await prisma.memory.update({
    where: { id },
    data: {
      content,
      coverUrl,
      isPublic,
    },
  })
}

export const excluir = async (request: FastifyRequest) => {
  const { id } = validarId.parse(request.params)

  return await prisma.memory.delete({ where: { id } })
}
