import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const redirectUrl = new URL('/', req.url)
  const maxAge = 0
  const path = '/'

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=; Path=${path}; max-age=${maxAge}`
    }
  })
} 
