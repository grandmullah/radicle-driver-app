import { useEffect, useState } from "react"
import database from '@react-native-firebase/database';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios'


const {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed
  } = require('@polkadot/util-crypto');
  import { Keyring } from '@polkadot/keyring';
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLocation } from "../app/features/rideSlice";

export const useUpdatelocation =()=> {
  const dispatch = useDispatch()
    const [location , setLocation] =  useState(null)
   
    const [token , setToken] = useState(null)
    const getLocation = async () => {

        let { granted } = await Location.requestForegroundPermissionsAsync();
          if (!granted) {
            console.log('rgrant permisoi',granted,)
            const permission = Location.useForegroundPermissions()
            console.log(permission)
            // setErrorMsg('Permission to access location was denied');
            return permission;
    
        }
    
        const {coords} = await Location.getCurrentPositionAsync({});
        await messaging().registerDeviceForRemoteMessages();
        const FCM_TOKEN = await messaging().getToken()
      
        setLocation(coords);
        // console.log('location',coords)
        setToken(FCM_TOKEN)
        // console.log('coords',FCM_TOKEN)
          
      }
     const account = useSelector(state=>state.crypto)
    useEffect(()=>{
        const interval = setInterval(() => {
        getLocation()
         console.log(token)
        // console.log('location',location)
        if(account && location){
          dispatch(updateCurrentLocation(location))
          socket.emit('update-location',{
            id: account.Pair.address,
            token:token,
            location: location
          })
         
        }
        
    }, 10000);
        return () => {
            clearInterval(interval);
          };
    },[location,account,socket,token])
}


// export const fetchAccount = async () => {
//     const mnemonic = await SecureStore.getItemAsync('mnemonic');
    
  
//     const keyring = new Keyring();
//     const pair = keyring.createFromUri(mnemonic);
//     // console.log(pair)

//     return{
//         address:pair.address,
//         mnemonic:`${mnemonic}`
//     }
// }