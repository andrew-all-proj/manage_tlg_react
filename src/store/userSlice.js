import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers:{
        authUser(state, action){
            state.user = {
                id_user: action.payload.id_user,
                user_name: action.payload.user_name
            }
        },
        logOutUser(state, action) {
            state.user = null
        }
    }
})

export const {authUser, logOutUser} = userSlice.actions

export default userSlice.reducer;