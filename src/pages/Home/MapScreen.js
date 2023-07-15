import { View, Text ,StyleSheet,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Center, VStack } from 'native-base'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import { mapStyle } from '../../globals/mapStyle'
import * as Location from 'expo-location';
import { useSelector } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions';
import {colors} from '../../globals/styles'



export  function MapScreen({origin,destination}) {
  const API_MAP_KEY = process.env.API_KEY_MAP
  
  const map = useRef(null)
  const [dirReady, setReady] = useState(false)
  const [location , setLocation] =  useState({
    latitude: -1.2921,
    longitude:  36.8219,
    latitudeDelta:0.09,
    longitudeDelta: 1,
  })
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
      // setLocation({latitude:coords.latitude,longitude:coords.longitude});
      // console.log(coords)
      
  }

  useEffect(()=>{ 
    
    getLocation()
    const ready = (Object.keys(origin|| {}).length != 0 && Object.keys(destination|| {}).length != 0 )
    console.log(ready)
    setReady(ready)
  },[origin,destination,location])


  const {id,state,details,rider,currentLocation} = useSelector((state)=>state.ride)
  console.log(details)
  const { width, height } = Dimensions.get('window');
  console.log(details.origin)
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
        {(dirReady && state==='accepted') && 
            <MapViewDirections
            origin={currentLocation}
            destination={details.origin}
            language='en'
            strokeWidth={4}
            strokeColor={colors.blue}
            apikey={API_MAP_KEY}
            timePrecision='now'
            mode='DRIVING'
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.,${result.fares},${result.waypointOrder}`)
              map.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
          />
        }
      </MapView>
  )
}

