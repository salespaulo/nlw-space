import decode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  sub: string,
  name: string,
  avatarUrl: string
}

export const getUser = (): User => {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error("Unauthenticate")
  }

  return decode(token) as User
}