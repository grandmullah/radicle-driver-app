import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { PresenceTransition,Center,Button,Text } from 'native-base';
import { Icon } from '@rneui/base';
import { ApiPromise } from '@polkadot/api';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../hooks/socket';
import { reset, updaterideState } from '../../app/features/rideSlice';
import { wsProvider } from '../../navigation';

export const RatingScreen = () => {
  const [selectedStar, setSelectedStar] = useState(null);
  const dispatch = useDispatch()
  const {Pair}= useSelector(state=>state.crypto)
  const{id,details,rider}= useSelector(state=>state.ride)
  const [loading,setLoading] = useState(false)
  console.log(details,rider)

  const handleStarPress = (star) => {
    setSelectedStar(star);
    console.log(`Selected star: ${star}`);
  };
  const handleComplete = async()=>{
      try {
            
        
            dispatch(updaterideState(`loading`))
            const api = await ApiPromise.create({ provider: wsProvider });
            
            const txHash = await api.tx.ride
            .completeRide(id,parseInt(details.ride.Distance).toString(), parseInt(details.ride.Duration).toString(),selectedStar,rider.address)
            .signAndSend(Pair, (result) => {
      
    
              console.log( `Current status is ${result.status}`)
                if (result.status.isInBlock) {
                  console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                  console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                  
                  txHash();
                  socket.emit('completed',(id))
                  dispatch(reset('completed'))
                 setLoading(false)
                }
              })
            console.log(`Submitted with hash ${txHash}`);
           
            
        } catch (error) {
            console.log(error)
        }
        
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the rider to complete ride  </Text>
       <Center padding={5}>
            <Text>{`Distance :${details.ride.Distance} `}</Text>
            <Text>{`Distance :${details.ride.Duration} Mins`}</Text>
       </Center>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            style={styles.starButton}
          >
            <Icon
              name={star <= selectedStar ? 'star' : 'stars'}
              size={40}
              color={star <= selectedStar ? '#FFD700' : '#D3D3D3'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <PresenceTransition visible={(selectedStar != null)} initial={{
      opacity: 0
    }} animate={{
      opacity: 1,
      transition: {
        duration: 250
      }
    }}>
        <Button onPress={handleComplete} marginTop={10} >proceed</Button>
      </PresenceTransition>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    marginHorizontal: 5,
  },
});


