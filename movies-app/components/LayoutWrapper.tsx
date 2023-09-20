"use client";

import { useFetchUser, UserProvider } from "@/lib/authContext";
import { useAppSelector } from "@/redux/store";

const LayoutWrapper = ({ children }) => {
  //const { user, loading } = useFetchUser();
  const {isLoggedIn, username} = useAppSelector((state) => state.authReducer.user);

  return <UserProvider value={{ username, loading: false }}>{children}</UserProvider>;
};

export default LayoutWrapper;
