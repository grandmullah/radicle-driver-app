import { View, Text ,StyleSheet,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Center, VStack ,Image} from 'native-base'
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps'
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
        {(dirReady && state==='started' || state==='accepted') && 
            <MapViewDirections
            origin={origin}
            destination={destination}
            language='en'
            strokeWidth={4}
            strokeColor={colors.blue}
            optimizeWaypoints={true}
            apikey={API_MAP_KEY}
            timePrecision='now'
            mode='DRIVING'
            onStart={(params) => {
              console.log(`Turn-by-turn navigation started with params: ${JSON.stringify(params)}`);
            }}
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
        {(dirReady && state==='accepted') && 
        <Marker coordinate={details.origin} description="Starting Location" title="Start" anchor = {{x:1,y:1}}>
          <Image 
            source={require('../../../assets/2526124.png')}
            alt='location'
            style={styles.markerOrigin2}
          />
        </Marker>
        }

      </MapView>
  )
}

const styles = StyleSheet.create({
  carsAround: {
    width: 28,
    height: 14,
    }, 
    markerOrigin2: {
      width: 30,
      height:40,
      borderRadius:0
     },
     topLeft: {
      flex:1,
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 10,
      backgroundColor: 'white',
    },
    topRight: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 10,
      backgroundColor: 'white',
    },
    content: {
    
      justifyContent: 'center',
      alignItems: 'center',
    },

})
