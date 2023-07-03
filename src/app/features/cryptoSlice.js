import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Keyring } from '@polkadot/api';
const {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed
  } = require('@polkadot/util-crypto');
  import * as SecureStore from 'expo-secure-store';

const initialState = {
  state: '',
  Pair: {},
  mnemonic:''
}

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {

    updateMnemonic: (state,action) => {
      
        console.log('here',action.payload)
        const keyring = new Keyring({ type: 'sr25519' });
        const newPair = keyring.addFromUri(action.payload);
        state.Pair=newPair
        state.mnemonic = action.payload
       state.state='loaded'
    },
    updatess:(state) =>{
      state.state='loading'
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateMnemonic,updatess } = cryptoSlice.actions

export default cryptoSlice.reducer




export function generateMnemonic ( ) {
    return  async (dispatch, getState) => {
        const mnemonicAlice = mnemonicGenerate();

        console.log(`Generated mnemonic: ${mnemonicAlice}`);
        const keyring = new Keyring({ type: 'sr25519' });
        const newPair = keyring.addFromUri(mnemonicAlice);
        axios.get(`https://3b6f-41-80-114-95.ngrok-free.app/check?id=${newPair.address}`)
        dispatch(updateMnemonic(mnemonicAlice))
         await SecureStore.setItemAsync('mnemonic', `${mnemonicAlice}`);
    await SecureStore.setItemAsync('onboardStatus', `true`);
    }
    
 
      
  
}