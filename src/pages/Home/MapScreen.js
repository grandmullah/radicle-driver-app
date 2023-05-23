import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import { Center } from 'native-base'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import { mapStyle } from '../../globals/mapStyle'

export  function MapScreen() {
  const API_MAP_KEY = process.env.API_KEY_MAP
  console.log('key', API_MAP_KEY)
  const map = useRef(null)
  return (
    <Center>
      <MapView
        style={{width: '100%',height: '100%',}}

        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation
        followsUserLocation 
        zoomControlEnabled
        ref={map} 
      >
      </MapView>
    </Center>
  )
}