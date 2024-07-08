import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import UserApi from '../api/UserApi';
import Loading from './Loading/Loading';
import User from '../user/User';

export interface UserLoginResponse {
  userId: string;
  user: User;
}

interface AuthenticationContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  csrfSessionToken: string;
  setCsrfSessionToken: (val: string) => void;
  userId: string;
  setUserId: (val: string) => void;
  user: User | null;
  setUser: (val: User | null) => void;
}

interface AuthenticationContextProviderProps {
  children: ReactNode;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuthenticated: (val) => {},
  csrfSessionToken: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCsrfSessionToken: (val) => {},
  userId: '1',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserId: (val) => {},
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (val) => {},
});

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export default function AuthenticationContextProvider({
  children,
}: AuthenticationContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [csrfSessionToken, setCsrfSessionToken] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const id = localStorage.getItem('userId');
        if (!id) throw new Error('No user id');
        const user = await new UserApi().get(id);
        setUserId(user._id);
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error AUTH check', error);
        setUserId('');
        setUser(null);
        setIsAuthenticated(false);
        localStorage.setItem('userId', '');
        throw error;
      }
    },
    retry: false,
  });

  if (isLoading) {
    return <Loading viewportHeight />;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        csrfSessionToken,
        setCsrfSessionToken,
        userId,
        setUserId,
        user,
        setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
