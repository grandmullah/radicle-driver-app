import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer  from './features/cryptoSlice'
import RideReducer  from './features/rideSlice'

export const store = configureStore({
  reducer: {
    crypto:cryptoReducer,
    ride:RideReducer
  },
})