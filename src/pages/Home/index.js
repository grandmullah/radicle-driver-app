import { View, Text,StyleSheet, Pressable } from 'react-native'
import React, { useMemo, useRef,useCallback } from 'react'
import { Center, Stack, VStack , HStack,Badge,Button} from 'native-base'
import { MapScreen } from './MapScreen'
import BottomSheet, { BottomSheetFlatList, BottomSheetModal  } from '@gorhom/bottom-sheet'
import { Avatar } from '@rneui/base'
import { useSelector } from 'react-redux'
import Loading from './loading'
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { AcceptScreen } from './slider'
import { Arrivedscreen } from './arrivedscree'
import { EndRide } from './endRide'

export  function Home() {
  const ride = useSelector((state)=>state.ride)
  const {id,api,details,rider,currentLocation} = useSelector((state)=>state.ride)

  const {state} = useSelector(state => state.crypto)
   const  bottomSheetModalRef = useRef(null)
  const snapPoints = useMemo(() => ['25%',], [])
 console.log(state)
  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();
    console.log(id)
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  


  console.log('haopa',id)
  return (
    <VStack h={'100%'} flex={1}>
      {
        (state == 'loading'|| api.state == 'loading')  && <Loading/>
      }
      <Pressable style={styles.topView}  >
        <Badge // bg="red.400"
        colorScheme="danger" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          fontSize: 12
        }}>
            {id.length>0 ? 1:0}
            </Badge>
          <Button onPress={handlePresentModalPress} mx={{
            base: "auto",
            md: 0
          }} p="2" bg="cyan.500" _text={{
            fontSize: 14,
            letterSpacing:5,
          }}>
              requests
            </Button>
        
      </Pressable>
      <View style={styles.bottomView} >
        <MapScreen origin={currentLocation} destination={api.state === 'loaded'? details.destination :details.origin}/>
      </View>
      
      {
        (id.length > 0 && ride.state == 'accepted' ) && <BottomSheet
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      > 
        <Arrivedscreen />
      </BottomSheet>
      
      }{
        (id.length > 0 && ride.state == 'arrived' ) && <BottomSheet
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
       
        <AcceptScreen />
       
      </BottomSheet>
      
      }{
        (id.length > 0 && ride.state == 'started' ) && <BottomSheet
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
       
       <EndRide/>
       
      </BottomSheet>
      
      }
      
    </VStack>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    height: '100%',
    width: '100%',
  },
  topView: {
   
    marginTop:15,
    marginLeft:10,
    position: 'absolute',
    zIndex: 1,

  },
});

