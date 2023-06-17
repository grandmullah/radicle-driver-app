import { View, Text,StyleSheet, Pressable } from 'react-native'
import React, { useMemo, useRef,useCallback } from 'react'
import { Center, Stack, VStack , HStack,Badge,Button} from 'native-base'
import { MapScreen } from './MapScreen'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Avatar } from '@rneui/base'

export  function Home() {
   const  bottomSheetModalRef = useRef(null)
  const snapPoints = useMemo(() => ['15%', '50%'], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  
  return (
    <VStack h={'100%'} flex={1}>
      <Pressable style={styles.topView}  >
      <Badge // bg="red.400"
        colorScheme="danger" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          fontSize: 12
        }}>
            2
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
      <View style={styles.bottomView} ><MapScreen/></View>
      
      
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetFlatList/>
      </BottomSheetModal>
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

const data = [
  {name:'JD', },
  {name:'JD', },
  {name:'JD', },
  {name:'JD', },
  {name:'JD', }
]