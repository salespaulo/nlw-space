import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJam = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-baijam' })

export const metadata = {
  title: 'NLW Spacetime',
  description: 'NLW - Spacetime - Rocketseat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJam} font-sans bg-gray-900 text-gray-100`}>{children}</body>
    </html>
  )
}
