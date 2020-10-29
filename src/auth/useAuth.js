import { useContext } from 'react';
// import jwtDecode from 'jwt-decode';
import AuthContext from './context';
// import authStorage from './storage';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  // const onLogIn = (authToken) => {
  const onLogin = (user) => {
    // const loggedInUser = FAKE ? authToken : jwtDecode(authToken);
    setUser(user);
    /*
    authStorage.storeToken(
      FAKE ? JSON.stringify(loggedInUser) : authToken,
    );
    */
  };

  const onLogout = () => {
    setUser(null);
    // authStorage.removeToken();
  };

  return { onLogout, onLogin, user };
};

export default useAuth;
