const {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed
  } = require('@polkadot/util-crypto');
  import * as SecureStore from 'expo-secure-store';


export async function generateMnemonic ( ) {
    const mnemonicAlice = mnemonicGenerate();

    console.log(`Generated mnemonic: ${mnemonicAlice}`);
    const isValidMnemonic = mnemonicValidate(mnemonicAlice);

    console.log(`isValidMnemonic: ${isValidMnemonic}`);
    // const seedAlice = mnemonicToMiniSecret(mnemonicAlice);
    // const { publicKey, secretKey } = ed25519PairFromSeed(seedAlice);
    // console.log(publicKey)
    await SecureStore.setItemAsync('mnemonic', `${mnemonicAlice}`);
    await SecureStore.setItemAsync('onboardStatus', `true`);

  
}