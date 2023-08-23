import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {setUserFromAuth} from '../slices/userSlice';
import {useDispatch} from 'react-redux';

export function useAuth() {
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth().onAuthStateChanged(loggedUser => {
      if (loggedUser) {
        setUser(loggedUser);
        dispatch(
          setUserFromAuth({
            email: loggedUser.email,
            displayName: loggedUser.displayName,
          }),
        );
      } else {
        setUser(undefined);
      }
    });
    return unsub;
  }, [dispatch]);
  return {
    user,
  };
}
