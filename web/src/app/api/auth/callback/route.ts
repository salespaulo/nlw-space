import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const authResp = await api.post('/usuarios/oauth', {
    code
  })

  const { token } = authResp.data
  const redirectUrl = new URL('/', req.url)
  const maxAge = 60 * 60 * 24 * 30
  const path = '/'

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=${path}; max-age=${maxAge}`
    }
  })
} 
