"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
      {
        email: userData.email,
        username: userData.username,
        password: userData.password,
      }
    );
    console.log(response);
    router.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-root": {
                    background: "white",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-root": {
                    background: "white",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-root": {
                    background: "white",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
