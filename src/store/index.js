import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import userReducer from './userSlice'
import mobileReducer from './mobileSlice'


export default configureStore({
    reducer: {
        todos:todoReducer,
        user:userReducer,
        mobileMode:mobileReducer
    }
})