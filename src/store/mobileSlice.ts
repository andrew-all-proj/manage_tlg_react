import {createSlice, PayloadAction } from '@reduxjs/toolkit';

type MobileState = {
    mobileMode: boolean;
    showNavBar: boolean;
}

const initialState: MobileState = {
    mobileMode: false,
    showNavBar: true
}


// переключение в мобильный вид
const mobileSlice = createSlice({
    name: 'mobileMode',
    initialState,
    reducers:{
        setMobile(state, action: PayloadAction<boolean>){
            state.mobileMode = action.payload
        },
        setShowNavBar(state, action: PayloadAction<boolean>){
            state.showNavBar = action.payload
        },
    },
})

export const {setMobile, setShowNavBar} = mobileSlice.actions

export default mobileSlice.reducer;