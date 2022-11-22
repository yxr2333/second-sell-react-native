import { createSlice } from '@reduxjs/toolkit';
import { MockUserInfo } from '../types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {} as MockUserInfo,
    value: 0,
  },
  reducers: {
    save: (state, action) => {
      console.log('action.payload', action.payload);

      Object.assign(state.userInfo, action.payload);
    },
    increment: state => {
      state.value += 1;
    },
  },
});

export const { increment, save } = userSlice.actions;

export const selectCount = (state: any) => state.user.value;
export const selectUserToken = (state: any) => state.user.userInfo.token;

export default userSlice.reducer;
