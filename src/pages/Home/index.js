import { View, Text } from 'react-native'
import React from 'react'
import { Center, Stack, VStack } from 'native-base'
import { MapScreen } from './MapScreen'

export  function Home() {
  return (
    <VStack h={'100%'}>
            <MapScreen />
    </VStack>
  )
}