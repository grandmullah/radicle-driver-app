
import React from 'react'
import { HStack, Stack, VStack,Text,Center, Divider } from 'native-base'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { ApiPromise } from '@polkadot/api'
import { wsProvider } from '../onboard/registrationScreen'



export  function Profile() {
  const [cab,setCab]= useState({})
  const { profile  } = useSelector(state => state.ride)
  const {Pair} = useSelector (state=>state.crypto)
  console.log(profile)
  useEffect(()=>{
      async function get_cab (){
        const api = await ApiPromise.create({ provider: wsProvider });
      const now = await api.query.identity.cabDetails(profile.cab)
      const rewards = await api.query.reward.accounts(Pair.address)
      const g = now.toHuman()
      console.log(g,rewards)
      setCab(g)
      }
      get_cab()
  },[profile.cab])
  return (
    <VStack w={'100%'}>

        <Stack marginTop={10} marginX={10} >
            <Center>Your Profile </Center>
              <HStack marginX={10}padding={2} >
                <Text letterSpacing={2} fontSize={25}>Name :</Text>
                <Text letterSpacing={2} fontSize={25}>{profile.name}</Text>
              </HStack>
              <HStack marginX={10} padding={2} >
                <Text letterSpacing={2} fontSize={25}>Cab Index :</Text>
                <Text letterSpacing={2} fontSize={25}>{profile.cab}</Text>
              </HStack>
              <HStack marginX={10} padding={2}>
                <Text letterSpacing={2} fontSize={25}>phoneNumber :</Text>
                <Text letterSpacing={2} fontSize={25}>{profile.phoneNumber}</Text>
              </HStack>
              <HStack marginX={10}padding={2}>
                <Text letterSpacing={2} fontSize={25}>rating :</Text>
                <Text letterSpacing={2} fontSize={25}>{profile.rating}</Text>
              </HStack>
              <HStack marginX={10} padding={2} >
                <Text letterSpacing={2} fontSize={25}>ride Count:</Text>
                <Text letterSpacing={2} fontSize={25}>{profile.rideCount}</Text>
              </HStack>

        </Stack>
        <Divider/>
        <Stack marginTop={10} marginX={10} >
            <Center>Your Cab Details  </Center>

              <HStack marginX={10} padding={2} >
                <Text letterSpacing={2} fontSize={25}>Cab Index :</Text>
                <Text letterSpacing={2} fontSize={25}>{profile.cab}</Text>
              </HStack>
              <HStack marginX={10}padding={2} >
                <Text letterSpacing={2} fontSize={25}>Model :</Text>
                <Text letterSpacing={2} fontSize={25}>{cab?.model}</Text>
              </HStack>
              <HStack marginX={10} padding={2}>
                <Text letterSpacing={2} fontSize={25}>Registration :</Text>
                <Text letterSpacing={2} fontSize={25}>{cab?.plate}</Text>
              </HStack>   
              <HStack marginX={10} padding={2} >
                <Text letterSpacing={2} fontSize={25}>Manufacture Year:</Text>
                <Text letterSpacing={2} fontSize={25}>{cab?.manufactureYear}</Text>
              </HStack>
              <HStack marginX={10} padding={2} >
                <Text letterSpacing={2} fontSize={25}>rating :</Text>
                <Text letterSpacing={2} fontSize={25}>{cab?.rating}</Text>
              </HStack>
              <HStack marginX={10} padding={2}>
                <Text letterSpacing={2} fontSize={25}>Driver :</Text>
                <Text letterSpacing={2} fontSize={25}>{cab?.driver}</Text>
              </HStack>
              <HStack marginX={10} padding={2}>
                <Text letterSpacing={2} fontSize={25}>Owner :</Text>
                <Text letterSpacing={2} fontSize={25}>{cab?.owner}</Text>
              </HStack>

        </Stack>
      
    </VStack>
  )
}