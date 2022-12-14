import api from '.';

import IUser from '../../interfaces/User';

export async function register(name: string, email: string, password: string) {
  try {
    const response = await api.post<{user: IUser, token: string}>(
      '/users',
      { name, email, password },
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await api.post<{user: IUser, token: string}>(
      '/users/login',
      { email, password },
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function getUser(userId: string) {
  try {
    const response = await api.get<IUser>(
      `/users/${userId}`,
      {},
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}
