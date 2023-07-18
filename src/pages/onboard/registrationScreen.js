import { Center, Input, Stack, VStack,Text,Box, Button, KeyboardAvoidingView, FormControl, TextArea, Alert, useToast,PresenceTransition,Radio } from 'native-base';
import React,{useEffect, useState,useRef} from 'react';
import {View, StyleSheet, Dimensions,SafeAreaView,Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import PhoneInput from 'react-phone-number-input'
import { Keyring } from '@polkadot/api';
import { ApiPromise, WsProvider } from '@polkadot/api';
export const wsProvider = new WsProvider('ws://34.171.4.42:9944');
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Loading from '../Home/loading';
// const keyring = new Keyring({ type: 'sr25519' });
export const RegistrationScreen = ({navigation}) => {
    const {state} = useSelector(state => state.crypto)
    const toast = useToast()
    const toastIdRef = React.useRef();
    const {mnemonic,Pair} = useSelector((state)=>state.crypto)
    const [name,setName] =  useState('')
    const [phoneNumber,setphoneNumber] =  useState('')
    const [cab,setCab] =  useState(0)
    const [value, setValue]= useState('no')
    const [loading,setLoading] = useState(false)

    

   const handleSignup = async () => {
    try {
        setLoading(true)
        toastIdRef.current = toast.show({
            render: () => {
              return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                      transaction initiated 
                    </Box>;
            },
            placement: "top"
        });
        console.log(name)
        // const newPair = keyring.addFromUri(mnemonic);
        const api = await ApiPromise.create({ provider: wsProvider });
        
        const txHash = await api.tx.identity
        .addDriver(phoneNumber, name,cab)
        .signAndSend(Pair, (result) => {
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
              setLoading(false)
              txHash();
              
              navigation.navigate('HomeStack')
            }
          })
        console.log(`Submitted with hash ${txHash}`);
       
        
    } catch (error) {
        console.log(error)
    }
    
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} h={{
            base: "400px",
            lg: "auto"
          }}>
        <Center sty le={styles.con}>
            
            <VStack w="100%">
            {
                (state == 'loading' || loading) && <Loading/>
            }
                <Stack space={2}>
   

                    <Stack marginTop={'5%'} marginX={'5%'} padding={10} space={5}>
                        <Stack > 
                            <Text mb="4" bold fontSize="lg" letterSpacing={5}>
                                Mnemonic
                            </Text>
                            <TextArea letterSpacing={2}  backgroundColor={'#449342'} textAlign={'center'}   totalLines={10} fontSize={20} isDisabled value={mnemonic} color={'black'}  borderColor={'black'}/>
                        </Stack>
                        <Text  bold fontSize="lg" letterSpacing={5}>
                             Details
                        </Text>
                        <FormControl>
                            <FormControl.Label>Full Names</FormControl.Label>
                            <Input value={name} onChangeText={(value)=>setName(value)} borderRadius={'md'} borderColor={'black'} size="lg" placeholder="names..." />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>phone Number</FormControl.Label>
                            <Input  onChangeText={(value)=>setphoneNumber(value)} borderRadius={'md'} borderColor={'black'} size="lg" placeholder="07...." />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label> Do you have a Cab already Registered? </FormControl.Label>
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
                                <FormControl.Label> Enter Cab Index</FormControl.Label>
                                <Input  onChangeText={(value)=>setCab(value)} borderRadius={'md'} borderColor={'black'} size="lg" placeholder="0" />
                            </FormControl>
                        </PresenceTransition>

                        <Button onPress={handleSignup} borderRadius={25} size={'lg'} colorScheme="green">
                            SIGN IN 
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
        </Center>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    con:{
        width:Dimensions.get('window').width,
        backgroundColor:'white'
        
    }
})
