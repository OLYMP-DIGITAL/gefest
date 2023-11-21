import { User } from 'core/features/users/users.types';
import api from 'core/services/api';
import { getToken } from 'core/services/token';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Auth {
  user?: User;
  isLoading: boolean;
  setUser(user: User): void;
}

export const AuthContext = createContext<Auth>({
  user: undefined,
  isLoading: false,
  setUser() {
    console.log('Stub debugging');
  },
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLoggedInUser = async () => {
    try {
      const response = await api.get<User>('users/me');
      console.log('Goted response!', response);

      if (response && response.id) {
        setUser(response);
      } else {
        console.error('There is no logged in data on response', response);
      }
    } catch (e) {
      console.error('Error on fetch logged in user', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getToken().then((t) => {
      if (t) {
        setToken(t);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (token) {
      api.token = token;
      fetchLoggedInUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
