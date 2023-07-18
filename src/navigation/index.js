import React,{useState,useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from '../pages/Home/MapScreen';
import { Home } from '../pages/Home';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { Onboard } from '../pages/onboard/onboard';
import { RegistrationScreen } from '../pages/onboard/registrationScreen';
import { useUpdatelocation } from '../hooks';
import messaging from '@react-native-firebase/messaging';
import notifee ,{ EventType }from '@notifee/react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Profile, profile } from '../pages/profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import { updateMnemonic, updatess } from '../app/features/cryptoSlice';
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { acceptRide, notification, updateProfile } from '../app/features/rideSlice';
import Loading from '../pages/Home/loading';
import { CabRegistration } from '../pages/onboard/CabRegistration';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

SplashScreen.preventAutoHideAsync();


export const wsProvider = new WsProvider('ws://34.171.4.42:9944');




messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await notifee.requestPermission()
  const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  const d = JSON.parse(remoteMessage.data.data)
    if(d.type === 'requests'){
      await notifee.displayNotification({
          title: 'Ride Request',
          body: 'is requesting a Ride ',
          data:remoteMessage.data,
          android: {
              channelId: channelId,
              actions: [
              {
                  title: 'Accept',
                  icon: 'https://my-cdn.com/icons/snooze.png',
                  pressAction: {
                  id: 'accept',
                  launchActivity: 'default',
                  },
              },
              {
                  title: 'Reject',
                  icon: 'https://my-cdn.com/icons/snooze.png',
                  pressAction: {
                  id: 'reject',
                  
                  },
              },
              ],
          },
        });
    }



})

export  function NavStack() {

  
  const [onboardStatus, setOnboardStatus] = useState(null)
  const [key, setKey] = useState(true)
   const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function getValueFor(key) {
      try {
        const result = await SecureStore.getItemAsync(key);
        
        setOnboardStatus(result);
        if (result ){
          const api = await ApiPromise.create({ provider: wsProvider });
          const mnemonic = await SecureStore.getItemAsync('mnemonic')
          const keyring = new Keyring({ type: 'sr25519' })
          const pair =  keyring.createFromUri(mnemonic);
          console.log(pair.address)
          const now = await api.query.identity.drivers(pair.address)
          const gg = await api.query.identity.drivers(pair.address)
          console.log(now)
          // setKEy
          setKey(now.isEmpty)
          dispatch(updateMnemonic(mnemonic))
          console.log(mnemonic)
          requestUserPermission()
         
        }
      } catch (error) {
        console.log(error)
      }finally{
        setloading(false)
        await SplashScreen.hideAsync()
      }
      
    }
    getValueFor('onboardStatus')
  },[])
  
 
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'accept') {
    //   console.log('accepted',detail)//
      // update db via socket 
      dispatch(acceptRide(JSON.parse(detail.notification.data.data)))
      

    }
  });
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
        case EventType.ACTION_PRESS:
          if ( detail.pressAction.id === 'accept') {
            dispatch(acceptRide(JSON.parse(detail.notification.data.data)))
          }
          break;
      }
    });
  }, []);
  async function onMessageReceived(message) {
    dispatch(notification(message))
  }
  messaging().onMessage(onMessageReceived);
  if(onboardStatus != `true` && key && !loading){
      return (
        <OnboardStack/>
      )
   }
   if( onboardStatus === `true` && key && !loading){
    return (
        <RegistrationStack/>
    )
   }
   if(onboardStatus === `true` && !key && !loading){
    /**
     * should have drawer and tab navigation
     */
    return (
      <AppStack />
    );
   }
  }













export const AppStack = () => {
  const dispatch = useDispatch()
  // dispatch()
  //check if has  cab 

  useUpdatelocation()

  const [cab,setCab]= useState(null)

  const { Pair }= useSelector(state=>state.crypto)

  useEffect(()=>{
    async function getValueFor(key) {
      const api = await ApiPromise.create({ provider: wsProvider });
      const now = await api.query.identity.drivers(Pair.address)
      const g = now.toHuman()
      console.log(g)
      setCab(g.cab)
      dispatch(updateProfile(g))

    }
    getValueFor()
  },[])
   if (cab == null){
    return <Loading />
   }
   if(cab==0 ){
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Cabregis' component={CabRegistration}/>
        <Stack.Screen name='HomeTabs' component={HomeTabs}/>
      </Stack.Navigator>
      
    )
  }
   if(cab>0){
    return (
      <HomeTabs />
    )
   }
    
}


export function OnboardStack() { 
  return(
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen  name='Onboard' component={Onboard} options={{
      headerShown: false,
      cardStyleInterpolator: forFade,
    }}/>
    <Stack.Screen  name='Registration' component={RegistrationStack} options={{
      headerShown: false,
      cardStyleInterpolator: forFade,
    }}/>
    <Stack.Screen  name='HomeStack' component={AppStack} options={{
      headerShown: false,
      cardStyleInterpolator: forFade,
    }}/>
  </Stack.Navigator>
  )}

const HomeScreens =() => {

    return (
      <BottomSheetModalProvider>
        <Stack.Navigator>
            <Stack.Screen  name='home' component={Home} options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}/>
        </Stack.Navigator>
        </BottomSheetModalProvider>
    )
}

const AppScreens =() => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='app' component={Profile} options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }} />
        </Stack.Navigator>
    )
}

const NotifcationScreens =() => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="notifications"  component={Profile} options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}/>
        </Stack.Navigator>
    )
}

const RegistrationStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="RegistrationScreens"  component={RegistrationScreen} options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}/>
        <Stack.Screen name="HomeStack"  component={AppStack} options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}/>
    </Stack.Navigator>
)
}

const HomeTabs =()=>{
  return (
    <Tab.Navigator initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      headerShown:false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreens}
      options={{
        headerShown:false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotifcationScreens}
      options={{
        headerShown:false,
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <Icon name="notifications" color={color} size={size} />
        ),
        tabBarBadge: 3,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={AppScreens}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="menu" color={color} size={size} />
        ),
      }}
    />
    </Tab.Navigator>
);
}



async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {

    console.log('Authorization status:', authStatus);
  }

}



// messaging().setBackgroundMessageHandler(onMessageReceived);

