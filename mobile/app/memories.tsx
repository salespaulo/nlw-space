import React, { useEffect, useState } from 'react'

import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

dayjs.locale(ptBr)

interface Memoria {
  id: string
  excerpt: string
  coverUrl?: string
  createdAt: string
}

export default function Memories() {
  const route = useRouter()

  const [memorias, setMemorias] = useState<Memoria[]>([])

  const { bottom, top } = useSafeAreaInsets()

  async function signout() {
    await SecureStore.deleteItemAsync('token')
    route.push('/')
  }

  async function listarMemorias() {
    const token = await SecureStore.getItemAsync('token')

    const { data } = await api.get('/memorias', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemorias(data)
  }

  useEffect(() => {
    listarMemorias()
  }, [])

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        paddingBottom: bottom,
        paddingTop: top,
      }}
    >
      <View className="mt-4 px-4 flex-row items-center justify-between">
        <NLWLogo />

        <View className="flex-row pl-2 gap-1">
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            onPress={signout}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500 text-black"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-6 mb-2 space-y-10">
        {memorias.map((m: Memoria) => {
          return (
            <View key={`m-${m.id}`} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-sm text-gray-100">
                  {dayjs(m.createdAt).format('D[ de ]MMMM[, ]YYYY')}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{ uri: m.coverUrl }}
                  alt="cover"
                  className="aspect-video w-full rounded-lg"
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {m.excerpt}
                </Text>
                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
