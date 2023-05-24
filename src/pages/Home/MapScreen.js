import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Center } from 'native-base'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import { mapStyle } from '../../globals/mapStyle'
import * as Location from 'expo-location';


export  function MapScreen() {
  const API_MAP_KEY = process.env.API_KEY_MAP
  console.log('key', API_MAP_KEY)
  const map = useRef(null)
  const [location , setLocation] =  useState(null)
  const getLocation = async () => {

    let { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log('rgrant permisoi',granted,)
        const permission = Location.useForegroundPermissions()
        console.log(permission)
        // setErrorMsg('Permission to access location was denied');
        return permission;

      }

      let {coords} = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(coords)
  }

  useEffect(()=>{
    getLocation()
  })
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
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>
    </Center>
  )
}