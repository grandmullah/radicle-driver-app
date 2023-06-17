import { View, Text ,StyleSheet} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Center, VStack } from 'native-base'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import { mapStyle } from '../../globals/mapStyle'
import * as Location from 'expo-location';


export  function MapScreen() {
  const API_MAP_KEY = process.env.API_KEY_MAP
  console.log('key', API_MAP_KEY)
  const map = useRef(null)
  const [location , setLocation] =  useState({
    latitude: -1.2921,
    longitude:  36.8219,
    latitudeDelta:0.09,
    longitudeDelta: 1,
  },)
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
    
      <MapView
        style={{width: '100%',height: '100%',}}

        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation
        followsUserLocation 
        zoomControlEnabled
        ref={map} 
        region={location}
      >
      </MapView>
  )
}

