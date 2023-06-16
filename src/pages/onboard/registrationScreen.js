import { Center, Input, Stack, VStack,Text, Button, KeyboardAvoidingView } from 'native-base';
import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions,SafeAreaView,Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import PhoneInput from 'react-phone-number-input'
import { useNavigation } from '@react-navigation/native';
import { Keyring } from '@polkadot/api';



export const RegistrationScreen = () => {
     
    const navigation = useNavigation()

    const [PHRASE, setValue] = useState()
    useEffect(()=>{
        async function save() {
            let r = await SecureStore.getItemAsync('mnemonic');
            console.log(r)
            setValue(r)
        }
        save()
    })
    const handleSignup = async () => {
        try {
            console.log('here')
            const newPair = keyring.addFromUri(PHRASE);
            const api = await ApiPromise.create({ provider: wsProvider });
            const now = await api.query.timestamp.now();
            console.log(now,api.tx.identity)
        // const txHash = await api.tx.identity
        // // console.log(api.tx)
        // .addUsr('0724341383', 'colllins')
        // .signAndSend(newPair);
        // console.log(`Submitted with hash ${txHash}`);
            navigation.navigate('HomeStack')
        } catch (error) {
            console.log(error)
        }
        
        }
    return (
        <VStack h={'100%'}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Center style={styles.con}>
            
            <VStack w="100%">
                <Center w={'100%'} padding={5}>
                    <Text fontFamily={'monospace'} fontSize={'30'} color={'white'}>{`${PHRASE}`}</Text>
                </Center>
                <Center padding={6}>
                    <Input padding='2' variant={'rounded'} color={'black'} backgroundColor={'white'} />
                </Center>
                <Center padding={4}>
                    <Button onPress={handleSignup}  size={'md'}>proceed with signup</Button>
                </Center>
                <Text>{PHRASE}</Text>
            </VStack>
        </Center>
        </KeyboardAvoidingView>
        </VStack>
    );
}

const styles = StyleSheet.create({
    con:{
        height:'100%',
        width:Dimensions.get('window').width,
        backgroundColor:"#003c8f"
        
    }
})

