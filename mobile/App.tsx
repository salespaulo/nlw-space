import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-zinc-900 flex-1 items-center justify-center">
      <Text className="text-gray-50 font-bold text-5xl">Olá Mundo!</Text>
      <StatusBar style="light" translucent />
    </View>
  );
}
