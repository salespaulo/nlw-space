import React, { useEffect } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { api } from '../src/lib/api'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/25306c905bbc48cd5b22',
}

export default function App() {
  const router = useRouter()
  const [, response, signInGithub] = useAuthRequest(
    {
      clientId: '25306c905bbc48cd5b22',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function signin(code) {
    try {
      const res = await api.post('/usuarios/oauth/m', { code })
      const { token } = res.data
      SecureStore.setItemAsync('token', token)
      router.push('/memories')
    } catch (e) {
      console.error(e)
      alert('Unauthorized')
    }
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      signin(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            queiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => signInGithub()}
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lambrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
