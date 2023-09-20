"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LoginForm from "./LoginForm/LoginForm";
import { Alert, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/authContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { removeAuthToken } from "@/lib/auth";
import { useDispatch } from "react-redux";
import { logout, clearError } from "@/redux/features/authSlice";
import { useEffect } from "react";

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useAppSelector((state) => state.authReducer);
  const {isLoggedIn, username} = user;
  
  //const { error } = useAppSelector((state) => state.authReducer);
  const handleLogout = () => {
    removeAuthToken();
    dispatch(logout());
  };

  const handleAlertClose = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    setTimeout(handleAlertClose, 10000);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home button"
            sx={{ mr: 2 }}
            onClick={() => {
              router.push("/");
            }}
          >
            <HomeIcon />
          </IconButton>
          {isLoggedIn && (
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
                router.push("/reviews");
              }}
            >
              Reviews
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {!isLoggedIn ? (
            <LoginForm />
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
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
        {error && (
          <Alert severity="error" onClose={handleAlertClose}>
            {error}
          </Alert>
        )}
      </AppBar>
    </Box>
  );
}
