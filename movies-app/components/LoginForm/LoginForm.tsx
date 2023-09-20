"use client";

import { removeAuthToken, storeAuthToken } from "@/lib/auth";
import { useFetchUser, useUser } from "@/lib/authContext";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

import styles from "./LoginForm.module.css";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/services/authActions";

export default function LoginForm() {
  const [data, setData] = useState({ identifier: "", password: "" });
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
    //   { identifier: data.identifier, password: data.password }
    // );
    // storeAuthToken(response);
    dispatch(loginUser(data))

    // const jwt = response.data.jwt;
    // const username = response.data.user.username;
    // dispatch(login({ jwt, username }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
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
    </>
  );
}
