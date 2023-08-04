"use client";

import Cookies from "js-cookie";
import Router from "next/router";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const storeAuthToken = ({data}) => {
  // const router = useRouter()
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  // if (Cookies.get("username")) {
  //   router.push("/");
  // }
};

export const removeAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");

  // Router.push("/");
};

export const getUserFromLocalCookie = () => {
  console.log(Cookies.get("username"));
  return Cookies.get("username");
};

export const getIdFromLocalCookie = () => {
  return Cookies.get("id");
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};
