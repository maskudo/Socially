import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const unsub = auth().onAuthStateChanged(loggedUser => {
      if (loggedUser) {
        setUser(loggedUser);
      } else {
        setUser(undefined);
      }
    });
    return unsub;
  }, []);
  return {
    user,
  };
}
