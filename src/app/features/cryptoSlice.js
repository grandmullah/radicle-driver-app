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

    updateState: (state,action) => {
      state.state=action.payload
      
    },
    updateKey: (state,action)=>{
      state.Pair=action.payload.pair
      state.mnemonic =action.payload.mnemonic
      state.state = 'loaded'
    },
    updatess:(state) =>{
      state.state='loading'
    }
  },
})

// Action creators are generated for each case reducer function
export const {updateState,updateKey, updatess } = cryptoSlice.actions

export default cryptoSlice.reducer




export function generateMnemonic ( ) {
    return  async (dispatch, getState) => {
      const mnemonicAlice = mnemonicGenerate();

      console.log(`Generated mnemonic: ${mnemonicAlice}`);
      const keyring = new Keyring({ type: 'sr25519' });
      const newPair = keyring.addFromUri(mnemonicAlice);
      axios.get(`http://34.171.4.42:4000/check?id=${newPair.address}`)
      dispatch(updateMnemonic(mnemonicAlice))
      await SecureStore.setItemAsync('mnemonic', `${mnemonicAlice}`);
      await SecureStore.setItemAsync('onboardStatus', `true`);
    }
}

export function updateMnemonic (mnemonic) {
  return  async (dispatch, getState) => {
    dispatch(updateState('loading'))
    console.log('here',mnemonic)
    const keyring = new Keyring({ type: 'sr25519' });
    const newPair = keyring.addFromUri(mnemonic);
    dispatch(updateKey({mnemonic:mnemonic, pair:newPair}))
    // dispatch(updateState('loaded'))
  }
}