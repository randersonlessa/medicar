import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

import IUser from '../interfaces/User';
import AuthRepository from '../repositories/auth';
import ConfigRepository from '../repositories/config';
import UserRepository from '../repositories/user';
import * as UserService from '../services/api/users';

interface UserContextProps {
  userContextLoading: boolean;
  user: IUser | null;
  register: (name: string, email: string, password: string) => void;
  login: (name: string, password: string, keep: boolean) => void;
  logout: () => void;
}

interface UserProviderProps {
  children?: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({
  userContextLoading: true,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: (name: string, email: string, password: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (name: string, password: string, keep: boolean) => {},
  logout: () => {},
});

export function UserProvider({ children }: UserProviderProps) {
  const [userContextLoading, setUserContextLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await UserService.register(name, email, password);

    const storage = sessionStorage;

    new ConfigRepository().setKeepSession(false);
    new AuthRepository(storage).setToken(result.token);

    new UserRepository(storage).setUser(result.user);
    setUser(result.user);
  }, []);

  const login = useCallback(async (email: string, password: string, keepSession: boolean) => {
    const result = await UserService.login(email, password);

    const storage = keepSession ? localStorage : sessionStorage;

    new ConfigRepository().setKeepSession(keepSession);
    new AuthRepository(storage).setToken(result.token);

    new UserRepository(storage).setUser(result.user);
    setUser(result.user);
  }, []);

  const logout = useCallback(() => {
    const keepSession = new ConfigRepository().getKeepSession();
    const storage = keepSession ? localStorage : sessionStorage;
    new UserRepository(storage).removeUser();
    new AuthRepository(storage).removeToken();
    setUser(null);
  }, []);

  useEffect(() => {
    const keepSession = new ConfigRepository().getKeepSession();
    const storage = keepSession ? localStorage : sessionStorage;
    const currentUser = new UserRepository(storage).getUser();
    setUser(currentUser);
    setUserContextLoading(false);
  }, []);

  return (
    <UserContext.Provider value={useMemo(() => ({
      userContextLoading,
      user,
      register,
      login,
      logout,
    }), [userContextLoading, user, register, login, logout])}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  return userContext;
}

export default UserContext;
