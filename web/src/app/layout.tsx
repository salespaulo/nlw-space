import { cookies } from 'next/headers'

import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto
} from 'next/font/google'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'

import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJam = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-baijam' })

export const metadata = {
  title: 'NLW Spacetime',
  description: 'NLW - Spacetime - Rocketseat',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const isAuthenticate = cookies().has('token')

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJam} font-sans bg-gray-900 text-gray-100`}>

        <main className="grid-cols-2 min-h-screen grid">

          <div id="left" className="relative bg-[url(../assets/bg-stars.svg)] flex flex-col items-start justify-between overflow-hidden px-28 py-16 border-r border-white/10">

            <div id="blur" className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>

            <div id="stripes" className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

            {isAuthenticate ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>

          <div id="right" className="flex flex-col overflow-scroll max-h-screen bg-[url(../assets/bg-stars.svg)] bg-cover">

            {children}

          </div>
        </main>
      </body>
    </html>
  )
}
