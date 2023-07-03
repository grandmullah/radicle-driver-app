import { View, Text } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/themed'
import { Center, Spinner } from 'native-base'

export default function Loading() {
  return (
    <Overlay isVisible={true}>
            <Center>
                  <Spinner/>
            </Center>
    </Overlay>
  )
}