import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  user: any;
}

const initialState: UserState = {
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authUser(state, action: PayloadAction<any>) {
      state.user = {
        id_user: action.payload.id_user,
        user_name: action.payload.user_name
      }
    },
    logOutUser(state, action: PayloadAction<any>) {
      state.user = null
    }
  }
})

export const { authUser, logOutUser } = userSlice.actions

export default userSlice.reducer;