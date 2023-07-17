import { Text,Center,View, Button } from 'native-base'
import React from 'react'
import { socket } from '../../hooks/socket'
import { useDispatch, useSelector } from 'react-redux'
import { updateState } from '../../app/features/rideSlice'
import { StyleSheet } from 'react-native'

export function Arrivedscreen() {
      const {id} = useSelector(state =>state.ride)
      const dispatch =  useDispatch()
      const handleArrival = ()=>{
            dispatch(updateState('arrived'))
            socket.emit('arrived',(id))
      }

  return (
    <View style={styles.container}>
            <Center>
                  <Text>
                        {'Have you Arrived ?'}
                  </Text>
                  <Button  borderRadius="full" colorScheme="success" onPress={handleArrival}>
                        <Text>Yes</Text>
                  </Button>
            </Center>
    </View>
  )
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})