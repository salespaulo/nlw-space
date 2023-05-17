import { z } from 'zod'

import type { FastifyRequest } from 'fastify'

import { prisma } from '../lib/prisma'

export const validarId = z.object({
  id: z.string().uuid(),
})

export const validarUsuario = z.object({
  name: z.string(),
})

export const consultar = async () => {
  return await prisma.user.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}

export const consultarPorId = async (request: FastifyRequest) => {
  const { id } = validarId.parse(request.params)
  return await prisma.user.findUniqueOrThrow({ where: { id } })
}

export const criar = async (request: FastifyRequest) => {
  const { name } = validarUsuario.parse(request.params)

  return await prisma.user.create({
    data: {
      name,
    },
  })
}

export const atualizar = async (request: FastifyRequest) => {
  const { id } = validarId.parse(request.params)
  const { name } = validarUsuario.parse(request.params)

  return await prisma.user.update({
    where: { id },
    data: {
      name,
    },
  })
}

export const excluir = async (request: FastifyRequest) => {
  const { id } = validarId.parse(request.params)

  return await prisma.user.delete({ where: { id } })
}
