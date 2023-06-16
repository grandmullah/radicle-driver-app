import { useEffect, useState } from "react"
import database from '@react-native-firebase/database';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import messaging from '@react-native-firebase/messaging';
const {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed
  } = require('@polkadot/util-crypto');
  import { Keyring } from '@polkadot/keyring';

export const useUpdatelocation =()=> {
    const [location , setLocation] =  useState(null)
    const [account, setAccount] = useState(null)
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
        const accountDetails = await fetchAccount()
        const FCM_TOKEN = await messaging().getToken()
        setLocation(coords);
        setToken(FCM_TOKEN)
        setAccount(accountDetails)
        // console.log('coords',FCM_TOKEN)
          
      }
    
    useEffect(()=>{
        const interval = setInterval(() => {
        getLocation()
        console.log('location',location)
        if(account && location){
            database()
            .ref(`/drivers/${account.address}`)
            .update({
                location: location,
                fcmToken: token,
            })
            .then(() => console.log('Data set.'));
        }
        
    }, 5000);
        return () => {
            clearInterval(interval);
          };
    },[location,account])
    
  return {account,location}
}


export const fetchAccount = async () => {
    const mnemonic = await SecureStore.getItemAsync('mnemonic');
    
  
    const keyring = new Keyring();
    const pair = keyring.createFromUri(mnemonic);
    // console.log(pair)

    return{
        address:pair.address,
        mnemonic:`${mnemonic}`
    }
}