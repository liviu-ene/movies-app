"use client";

import { removeAuthToken, storeAuthToken } from "@/lib/auth";
import { useFetchUser, useUser } from "@/lib/authContext";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [data, setData] = useState({ identifier: "", password: "" });
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      { identifier: data.identifier, password: data.password }
    );
    storeAuthToken(response);
    if (Cookies.get("username")) {
      console.log("refresh");
      window.location.reload();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const logout = () => {
    removeAuthToken();
    window.location.reload();
  };

  const test = useFetchUser();
  console.log(test);

  return (
    <>
      {!user ? (
        <>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <TextField
              type="text"
              name="identifier"
              onChange={handleChange}
              placeholder="Username"
              required
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  background: "white",
                },
              }}
            />
            <TextField
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              variant="outlined"
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  background: "white",
                },
              }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#1976d2",
                fontWeight: "700",
                "&:hover": {
                  backgroundColor: "white",
                  opacity: 0.5,
                },
              }}
              type="submit"
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#1976d2",
                fontWeight: "700",
                "&:hover": {
                  backgroundColor: "white",
                  opacity: 0.5,
                },
              }}
              onClick={() => {
                router.push("/register");
              }}
            >
              Register
            </Button>
          </form>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "#1976d2",
            fontWeight: "700",
            "&:hover": {
              backgroundColor: "white",
              opacity: 0.5,
            },
          }}
          onClick={logout}
        >
          Logout
        </Button>
      )}
    </>
  );
}
