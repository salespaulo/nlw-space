import React, { useEffect, useState } from 'react'

import * as SecureStore from 'expo-secure-store'

import { ImageBackground } from 'react-native'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isSignIn, setIsSignIn] = useState<null | boolean>(null)

  useEffect(() => {
    SecureStore.getItemAsync('token')
      .then((token) => setIsSignIn(!token))
      .catch((e: any) => alert(e))
  }, [])

  const [hasLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoaded) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name="index" redirect={isSignIn} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
