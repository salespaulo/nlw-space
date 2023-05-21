import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

dayjs.locale(ptBr)

interface Memoria {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string

}

// se nao tiver use client podemos colocar async 
export default async function Home() {
  const isAuth = cookies().has('token')

  if (!isAuth) {
    return (
      <EmptyMemories />
    )
  }

  const token = cookies().get('token')?.value
  const res = await api.get('/memorias', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const memorias: Memoria[] = res.data
  if (memorias.length === 0) {
    return (
      <EmptyMemories />
    )
  }
  return (
    <div
      className="flex flex-col gap-10 p-8">
      {
        memorias.map(m => {
          return (
            <div
              key={`mem-${m.id}`}
              className="space-y-4"
            >
              <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
                {dayjs(m.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </time>
              <Image
                src={m.coverUrl}
                width={592}
                height={280}
                className="aspect-video w-full rounded-lg object-cover"
                alt="cover" />
              <p
                className="text-lg leading-relaxed text-gray-100">{m.excerpt}</p>
              <Link
                href={`/memories/${m.id}`}
                className="flex items-center gap-2 text-sm text-gray-200 ">
                Ler mais
              </Link>
            </div>
          )
        })
      }

    </div>
  )
}
