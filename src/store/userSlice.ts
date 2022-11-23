import { createSlice } from '@reduxjs/toolkit';
import { UserBaseInfo } from '../types/response/developResponse';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {} as UserBaseInfo,
    value: 0,
  },
  reducers: {
    login: (state, action) => {
      // Object.assign(state.userInfo, action.payload);
      state.userInfo = action.payload;
    },
    logout: state => {
      // Object.assign(state.userInfo, {});
      state.userInfo = {} as UserBaseInfo;
    },

    increment: state => {
      state.value += 1;
    },
  },
});

export const { increment, login, logout } = userSlice.actions;

export const selectCount = (state: any) => state.user.value;
export const selectUserToken = (state: any) => state.user.userInfo.token;
export const selectUserInfo = (state: any) =>
  state.user.userInfo as UserBaseInfo;

export default userSlice.reducer;
