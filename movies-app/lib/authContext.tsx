"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { getUserFromLocalCookie } from '../lib/auth';

let userState;

const User = createContext({ user: null, loading: false });

export const UserProvider = ({ children }) => {
    const {user, loading} = useUser();
    console.log(user, loading);

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={{user, loading}}>{children}</User.Provider>;
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
  });

  useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();
      if (isMounted) {
        setUser({ user, loading: false });
      }
    };
    resolveUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};