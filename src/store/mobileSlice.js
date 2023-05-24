import {createSlice} from '@reduxjs/toolkit';

// переключение в мобильный вид
const mobileSlice = createSlice({
    name: 'mobileMode',
    initialState: {
        mobileMode: false,
        showNavBar: true
    },
    reducers:{
        setMobile(state, action){
            state.mobileMode = action.payload.mobileMode
        },
        setShowNavBar(state, action){
            state.showNavBar = action.payload.showNavBar
        },
    },
})

export const {setMobile, setShowNavBar} = mobileSlice.actions

export default mobileSlice.reducer;