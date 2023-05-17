import { User } from 'lucide-react'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="grid-cols-2 min-h-screen grid">

      <div id="left" className="relative bg-[url(../assets/bg-stars.svg)] flex flex-col items-start justify-between overflow-hidden px-28 py-16 border-r border-white/10">

        <div id="blur" className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>

        <div id="stripes" className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

        <a id="avatar" href="" className="flex items-center gap-3 text-left hover:text-gray-50 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>

          <p className="max-w-[140px] text-sm leading-snug">
            <span className='underline'>
              Crie sua conta{' '}
            </span>
            e salve suas memórias!
          </p>
        </a>

        <div id="hero" className='space-y-5'>
          <Image src={nlwLogo} alt="nlw-spacetime-logo" />

          <div className='max-w-[420px] space-y-1'>
            <h1 className='text-5xl font-bold leading-tight text-gray-50'>
              Sua cápsula do tempo
            </h1>
            <p className='text-lg leading-relaxed'>
              Colecione momentos marcantes da sua jornada e compartilhe
              (se quiser) com o mundo!
            </p>
          </div>
          <a href="" className='inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black uppercase hover:bg-green-700'>
            cadastrar lembrança
          </a>
        </div>

        <div id="copyright" className='text-sm leading-relaxed text-gray-200'>
          Feito com 💜 no NLW da{' '}
          <a href="https://rocketseat.com.br" target='_blank' rel="noreferrer" className='underline hover:text-gray-100'>
            Rocketseat
          </a>
        </div>

      </div>

      <div id="right" className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">

        <div id="empty" className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{" "}
            <a href="#" className="underline hover:text-gray-50">criar agora</a>!
          </p>
        </div>

      </div>
    </main>
  )
}
