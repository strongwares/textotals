import { useContext } from 'react';
import AuthContext from './context';
import authStorage from './storage';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const onLogin = (userObj) => {
    setUser(userObj);
    authStorage.storeToken(JSON.stringify(userObj));
  };

  const onLogout = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { onLogout, onLogin, user };
};

export default useAuth;
