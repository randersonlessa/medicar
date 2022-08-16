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
  addUser: (data: {user: IUser, token: string, keepSession: boolean}) => void;
  removeUser: () => void;
}

interface UserProviderProps {
  children?: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({
  userContextLoading: true,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addUser: (data: {user: IUser, token: string, keepSession: boolean}) => {},
  removeUser: () => {},
});

export function UserProvider({ children }: UserProviderProps) {
  const [userContextLoading, setUserContextLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  const addUser = useCallback((data: {user: IUser, token: string, keepSession: boolean}) => {
    const storage = data.keepSession ? localStorage : sessionStorage;

    new ConfigRepository().setKeepSession(data.keepSession);
    new AuthRepository(storage).setToken(data.token);

    new UserRepository(storage).setUser(data.user);
    setUser(data.user);
  }, []);

  const removeUser = useCallback(() => {
    const keepSession = new ConfigRepository().getKeepSession();
    const storage = keepSession ? localStorage : sessionStorage;
    new UserRepository(storage).removeUser();
    new AuthRepository(storage).removeToken();
    setUser(null);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const keepSession = new ConfigRepository().getKeepSession();
      const storage = keepSession ? localStorage : sessionStorage;
      const currentUser = new UserRepository(storage).getUser();

      if (currentUser) {
        try {
          const apiUser = await UserService.getUser(currentUser.id);
          setUser(apiUser);
        // eslint-disable-next-line no-empty
        } catch {}
      }
      setUserContextLoading(false);
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={useMemo(() => ({
      userContextLoading,
      user,
      addUser,
      removeUser,
    }), [userContextLoading, user, addUser, removeUser])}
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
