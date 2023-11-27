import { fetchMe } from 'core/features/users/users.api';
import { tokenAtom, userAtom } from 'core/features/users/users.atoms';
import { User } from 'core/features/users/users.types';
import api from 'core/services/api';
import { getToken, saveToken } from 'core/services/token';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';

interface Auth {
  user: User | null;
  isLoading: boolean;
  setUser(user: User): void;
}

export const AuthContext = createContext<Auth>({
  user: null,
  isLoading: false,
  setUser() {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [token, setToken] = useRecoilState(tokenAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLoggedInUser = async () => {
    try {
      const response = await fetchMe();

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
      saveToken(token);
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
