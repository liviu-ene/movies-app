"use client";

import { useFetchUser, UserProvider } from "@/lib/authContext";

const LayoutWrapper = ({ children }) => {
  const { user, loading } = useFetchUser();

  return <UserProvider value={{ user, loading }}>{children}</UserProvider>;
};

export default LayoutWrapper;
