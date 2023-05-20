import React, { useState } from 'react'

import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Icon from '@expo/vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

export default function New() {
  const route = useRouter()

  const { bottom, top } = useSafeAreaInsets()
  const [content, setContent] = useState<string>('')
  const [isPublic, setIsPublic] = useState(false)
  const [coverUrl, setCoverUrl] = useState<null | string>(null)

  async function abrirImgUpload() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1,
    })
    if (!result.canceled) {
      setCoverUrl(result.assets[0].uri)
    }
  }

  async function criarMemoria() {
    const token = await SecureStore.getItemAsync('token')

    let coverUrlCriada = ''

    if (coverUrl) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        name: 'image.jpg',
        type: 'image/jpg',
        uri: coverUrl,
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrlCriada = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memorias',
      {
        coverUrl: coverUrlCriada,
        content,
        isPublic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    route.push('/memories')
    setCoverUrl(null)
    setContent('')
    setIsPublic(false)
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        paddingBottom: bottom,
        paddingTop: top,
      }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372560' }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />

          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          onPress={abrirImgUpload}
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500a bg-black/20"
        >
          {coverUrl ? (
            <Image
              source={{ uri: coverUrl }}
              alt="cover-url"
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#FFF" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto out vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar pra sempre"
        ></TextInput>

        <TouchableOpacity
          onPress={criarMemoria}
          activeOpacity={0.7}
          className="items-center rounded-full self-end bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
