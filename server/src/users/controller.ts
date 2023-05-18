import axios from 'axios'
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

export const consultarPorGithubId = async (request: FastifyRequest) => {
  const { id } = z.object({ id: z.number() }).parse(request.params)
  return await prisma.user.findUniqueOrThrow({ where: { idGithub: id } })
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

export const oauthMobile = async (request: FastifyRequest) => {
  const { code } = z
    .object({
      code: z.string(),
    })
    .parse(request.body)

  const resp = await axios.post(
    'https://github.com/login/oauth/access_token',
    null,
    {
      params: {
        client_id: process.env.M_GITHUB_CLIENT_ID,
        client_secret: process.env.M_GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    },
  )

  const { access_token } = resp.data

  const userResp = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  const user = z
    .object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })
    .parse(userResp.data)

  return await prisma.user.upsert({
    where: {
      idGithub: user.id,
    },
    create: {
      idGithub: user.id,
      name: user.name,
      avatarUrl: user.avatar_url,
      login: user.login,
    },
    update: {
      name: user.name,
      avatarUrl: user.avatar_url,
      login: user.login,
    },
  })
}

export const oauth = async (request: FastifyRequest) => {
  const { code } = z
    .object({
      code: z.string(),
    })
    .parse(request.body)

  const resp = await axios.post(
    'https://github.com/login/oauth/access_token',
    null,
    {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    },
  )

  const { access_token } = resp.data

  const userResp = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  const user = z
    .object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })
    .parse(userResp.data)

  return await prisma.user.upsert({
    where: {
      idGithub: user.id,
    },
    create: {
      idGithub: user.id,
      name: user.name,
      avatarUrl: user.avatar_url,
      login: user.login,
    },
    update: {
      name: user.name,
      avatarUrl: user.avatar_url,
      login: user.login,
    },
  })
}
