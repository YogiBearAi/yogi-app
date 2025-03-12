import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request url
  const url = request.nextUrl.clone()

  // If trying to access /questionnaire without trailing slash
  if (url.pathname === '/questionnaire') {
    url.pathname = '/questionnaire/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/questionnaire', '/questionnaire/']
} 