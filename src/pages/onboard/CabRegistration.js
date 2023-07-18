import React, { useCallback, useEffect, useMemo, useRef,useState } from 'react';
import { View,  StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Center, Input, Stack, VStack,Text,Box, Button, KeyboardAvoidingView, FormControl, TextArea, Alert, useToast,PresenceTransition,Radio } from 'native-base';
import { useSelector } from 'react-redux';
import { wsProvider } from './registrationScreen';
import { ApiPromise, WsProvider } from '@polkadot/api';
import Loading from '../Home/loading';

export const CabRegistration = ({navigation}) => {
      const {Pair} = useSelector(state=>state.crypto)
      const bottomSheetRef = useRef(null);
      const [plate,setPlate] =  useState('')
      const [model,setModel] =  useState('')
      const [value,setValue] =  useState('yes')
      const [year,setYear] =  useState('')
      const [driver,setDriver] =  useState(Pair.address)
      const [loading,setLoading] = useState(false)
      const toast = useToast()
      const toastIdRef = React.useRef();
      
      const [cab_no, CaboCount]= useState()

      const snapPoints = useMemo(() => ['80%'], []);
      const handleSheetChanges = useCallback((index) => {
            console.log('handleSheetChanges', index);
          }, []);

      useEffect(()=>{
            async function  getcab (){
                  const api = await ApiPromise.create({ provider: wsProvider });
                  const c = await api.query.identity.cabCount()
                  console.log('her',c)
                  CaboCount(c)
            }
            getcab()
      },[])

      const handleSignup = async () => {
            try {
                setLoading(true)
                console.log('changes',parseInt(cab_no))
                toastIdRef.current = toast.show({
                    render: () => {
                      return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                              transaction initiated 
                            </Box>;
                    },
                    placement: "top"
                });
               
                // const newPair = keyring.addFromUri(mnemonic);
                const api = await ApiPromise.create({ provider: wsProvider });
                
                const txHash = await api.tx.identity
                .addCab(plate,year,model,driver)
                .signAndSend(Pair, async (result) => {
                    toastIdRef.current = toast.show({
                        render: () => {
                          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                 {`Current status is ${result.status}`}
                                </Box>;
                        },
                        placement: "top"
                    });
        
                
                    if (result.status.isInBlock) {
                      console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                      
                      
                    } else if (result.status.isFinalized) {
                      console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                      
                      txHash();
                      
                    }
                  })

                  await api.tx.identity
                  .assignDriver(`${parseInt(cab_no)+1}`,driver)
                  .signAndSend(Pair,(result) => {
                        toastIdRef.current = toast.show({
                              render: () => {
                              return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                          {`Current status is ${result.status}`}
                                    </Box>;
                              },
                              placement: "top"
                        });
            
                        
                        if (result.status.isInBlock) {
                              console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                              
                              
                        } else if (result.status.isFinalized) {
                              console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                              
                              txHash();
                              setLoading(false)
                              navigation.navigate('HomeTabs')
                        }
                  })
                console.log(`Submitted with hash ${txHash}`);
               
                
            } catch (error) {
                console.log(error)
            }
            
      }
      return (
            <View style={styles.container}>

                  {loading && <Loading/>}

            <BottomSheet
                  ref={bottomSheetRef}
                  index={0}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}
            >
                  <VStack w={'100%'}>
                        <Center>
                              <Text >{'Register your Cab'}</Text>
                        </Center>
                        <Stack marginTop={'5%'} marginX={'5%'} padding={10} space={5}>
                              <FormControl>
                                    <FormControl.Label>Plate Number</FormControl.Label>
                                          <Input value={plate} onChangeText={(value)=>setPlate(value)} borderRadius={'md'} borderColor={'black'} size="lg" placeholder="names..." />
                                    </FormControl>
                              <FormControl>
                                    <FormControl.Label>Model</FormControl.Label>
                                    <Input  value={model} onChangeText={(value)=>setModel(value)} borderRadius={'md'} borderColor={'black'} size="lg" placeholder="07...." />
                              </FormControl>
                              <FormControl>
                                    <FormControl.Label>Year of manufacture</FormControl.Label>
                                    <Input  value={year} onChangeText={(value)=>setYear(value)} borderRadius={'md'} borderColor={'black'} size="lg" placeholder="07...." />
                              </FormControl>

                              <FormControl>
                              <FormControl.Label> Are you  The Driver? </FormControl.Label>
                              <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
                                    setValue(nextValue);
                              }}>
                                    <Radio value="no" my={1}>
                                          No 
                                    </Radio>
                                    <Radio value="yes" my={1}>
                                    Yes
                                    </Radio>
                                    </Radio.Group>
                              </FormControl>
                              <PresenceTransition visible={value=='yes'} initial={{
                              opacity: 0
                              }} animate={{
                              opacity: 1,
                              transition: {
                                    duration: 250
                              }
                              }}>                             
                              <FormControl>
                                    <FormControl.Label> Your Address </FormControl.Label>
                                    <Text bold letterSpacing={2} fontSize={20} >{Pair.address}</Text>
                              </FormControl>
                              </PresenceTransition>
                              <PresenceTransition visible={value=='no'} initial={{
                              opacity: 0
                              }} animate={{
                              opacity: 1,
                              transition: {
                                    duration: 250
                              }
                              }}>                             
                              <FormControl>
                                    <FormControl.Label> Enter Driver Address </FormControl.Label>
                                    <Input value={driver} onChangeText={(value)=>setDriver(value)} borderRadius={'md'} borderColor={'black'} size="lg" placeholder="0" />
                              </FormControl>
                              </PresenceTransition>
                              <Button onPress={handleSignup} borderRadius={25} size={'lg'} colorScheme="green">
                                    Register
                              </Button>
                        </Stack>
                  </VStack>
            </BottomSheet>
            </View>
      );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
    });

// origin : OriginFor<T>,
// 			plate:Name<T>,
// 			manufacture_year:u16,
// 			model:Name<T>,
// 			driver:T::AccountId,