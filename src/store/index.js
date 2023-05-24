import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import mobileReducer from './mobileSlice'


export default configureStore({
    reducer: {
        user:userReducer,
        mobileMode:mobileReducer
    }
})