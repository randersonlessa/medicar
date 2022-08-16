import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getUser } from '../../services/api/users';

import ConfigRepository from '../../repositories/config';
import UserRepository from '../../repositories/user';
import AuthRepository from '../../repositories/auth';

import IUser from '../../interfaces/User';

export const loadUser = createAsyncThunk(
  'user/load',
  async () => {
    const keepSession = new ConfigRepository().getKeepSession();
    const storage = keepSession ? localStorage : sessionStorage;
    const currentUser = new UserRepository(storage).getUser();

    if (currentUser) {
      const user = await getUser(currentUser.id);
      return user;
    }

    return null;
  },
);

export interface UserState {
  user: IUser | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{user: IUser; token: string; keepSession: boolean}>) => {
      const storage = action.payload.keepSession ? localStorage : sessionStorage;

      new ConfigRepository().setKeepSession(action.payload.keepSession);
      new AuthRepository(storage).setToken(action.payload.token);

      new UserRepository(storage).setUser(action.payload.user);
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      const keepSession = new ConfigRepository().getKeepSession();
      const storage = keepSession ? localStorage : sessionStorage;
      new UserRepository(storage).removeUser();
      new AuthRepository(storage).removeToken();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload !== null) state.user = action.payload;
    });

    builder.addCase(loadUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
