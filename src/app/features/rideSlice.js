import { createSlice } from '@reduxjs/toolkit'
import { socket } from '../../hooks/socket'
import notifee  from '@notifee/react-native';


const initialState = {
      api:{
            state:'',
            message:''
      },
      state: '',
      rider:'',
      details: {},
      id:'',
      currentLocation:{}
      
}
export const rideSlice = createSlice({
      name: 'ride',
      initialState,
      reducers: {
            updateState: (state,action) => {
                  state.state=action.payload
                  
                  
            },
            updateState: (state,action) => {
                  state.state=action.payload
                  
                  
            },
            updateDetails:(state,action) => {
                  state.details=action.payload
                  
            },
            updateRider:(state,action) => {
                  state.rider=action.payload
                  
            },
            updateId:(state,action)=>{
                  state.id=action.payload
            },
            updaterideState:(state,action)=>{
                  state.api.state = action.payload
            },
            updateCurrentLocation:(state,action)=>{
                  state.currentLocation=action.payload
            },
      }

})


export const {updateDetails,updateState,updateRider,updateId,updateCurrentLocation,updaterideState } = rideSlice.actions

export default rideSlice.reducer

export function acceptRide (data) {
      return  async (dispatch, getState) => {
            console.log('here',data)
        socket.emit('acceptride',({id:data.id}))
        dispatch(updateState('accepted'))
        dispatch(updateId(data.id))
        dispatch(updateDetails(data.details))
        dispatch(updateRider(data.rider))
      }
}

export function startRide() {
      return  async (dispatch, getState) => {

      }
}

export const notification = message => {
    return  async (dispatch, getState) => {
      const d = JSON.parse(message.data.data)
      await notifee.requestPermission()
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      if(d.type === 'requests'){
            await notifee.displayNotification({
                title: 'Ride Request',
                body: 'is requesting a Ride ',
                data:message.data,
                android: {
                    channelId: channelId,
                    actions: [
                    {
                        title: 'Accept',
                        icon: 'https://my-cdn.com/icons/snooze.png',
                        pressAction: {
                        id: 'accept',
                        launchActivity: 'default',
                        },
                    },
                    {
                        title: 'Reject',
                        icon: 'https://my-cdn.com/icons/snooze.png',
                        pressAction: {
                        id: 'reject',
                        
                        },
                    },
                    ],
                },
              });
          }
    ole.log(`Counter after: ${stateAfter.counter}`)
    }
  }
