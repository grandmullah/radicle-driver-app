import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
// Import the API
const { ApiPromise } = require('@polkadot/api');
import { wsProvider } from '../onboard/registrationScreen';

const Rides = () => {
      async function main () {
            // Create our API with a default connection to the local node
            const api = await ApiPromise.create({ provider: wsProvider });
          
            // Subscribe to system events via storage
            api.query.system.events((events) => {
              console.log(`\nReceived ${events.length} events:`);
          
              // Loop through the Vec<EventRecord>
              events.forEach((record) => {
                // Extract the phase, event and the event types
                const { event, phase } = record;
                const types = event.typeDef;
          
                // Show what we are busy with
                console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
            //     console.log(`\t\t${event.meta.documentation.toString()}`);
          
                // Loop through each of the parameters, displaying the type and data
                event.data.forEach((data, index) => {
                  console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
                });
              });
            });
      }
      useEffect(()=>{
            main()
      })
          
      return (
            <View>
                  
            </View>
      );
}

const styles = StyleSheet.create({})

export default Rides;
