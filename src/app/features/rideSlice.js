import { createSlice } from '@reduxjs/toolkit'
import { socket } from '../../hooks/socket'



const initialState = {
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
            updateDetails:(state,action) => {
                  state.details=action.payload
                  
            },
            updateRider:(state,action) => {
                  state.rider=action.payload
                  
            },
            updateId:(state,action)=>{
                  state.id=action.payload
            },
            updateCurrentLocation:(state,action)=>{
                  state.currentLocation=action.payload
            },
      }

})


export const {updateDetails,updateState,updateRider,updateId,updateCurrentLocation } = rideSlice.actions

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