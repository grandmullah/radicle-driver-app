import { Center, Input, Stack, VStack,Text,Box, Button, KeyboardAvoidingView, FormControl, TextArea, Alert, useToast } from 'native-base';
import React,{useEffect, useState,useRef} from 'react';
import {View, StyleSheet, Dimensions,SafeAreaView,Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import PhoneInput from 'react-phone-number-input'
import { Keyring } from '@polkadot/api';
import { ApiPromise, WsProvider } from '@polkadot/api';
export const wsProvider = new WsProvider('ws://35.232.24.147:9944');
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


// const keyring = new Keyring({ type: 'sr25519' });
export const RegistrationScreen = ({navigation}) => {
    
    const toast = useToast()
    const toastIdRef = React.useRef();
    const {mnemonic,Pair} = useSelector((state)=>state.crypto)
    const [name,setName] =  useState('')
    const [phoneNumber,setphoneNumber] =  useState('')

    

   const handleSignup = async () => {
    try {
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
        .addUsr(phoneNumber, name)
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
              txHash();
              
            }
          }).then(()=>{
            navigation.navigate('HomeStack')
          });
        console.log(`Submitted with hash ${txHash}`);
       

        
        
    } catch (error) {
        console.log(error)
    }
    
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Center sty le={styles.con}>
            
            <VStack w="100%">
                <Stack space={2}>
                    <Stack marginTop={'10%'} marginX={'5%'} padding={10}> 
                        <Text mb="4" bold fontSize="lg" letterSpacing={5}>
                            Mnemonic
                        </Text>
                        <TextArea letterSpacing={2}  backgroundColor={'#449342'} textAlign={'center'}   totalLines={10} fontSize={20} isDisabled value={mnemonic} color={'black'}  borderColor={'black'}/>
                    </Stack>

                    <Stack marginX={'5%'} padding={10} space={5}>
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
        height:'100%',
        width:Dimensions.get('window').width,
        backgroundColor:'white'
        
    }
})


                // <Center w={'100%'} padding={5}>
                //     <Text fontFamily={'monospace'} fontSize={'30'} color={'white'}>{`${PHRASE}`}</Text>
                // </Center>
                // <Center padding={6}>
                //     <Stack>
                //         <FormControl>
                //         <FormControl.Label>Phone Number</FormControl.Label>
                //         <Input />
                //         </FormControl>
                //     </Stack>
                // </Center>
                // <Center padding={4}>
                //     <Button onPress={()=>handleSignup()} size={'md'}>proceed with signup</Button>
                // </Center>