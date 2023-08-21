import { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { getIdFromLocalCookie, getTokenFromLocalCookie } from "@/lib/auth";

export default function ReviewForm({ title }) {
  const [description, setDescription] = useState("");
  const jwt = getTokenFromLocalCookie();
  const user = getIdFromLocalCookie();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`,
      {
        data: {
          title,
          description,
          user,
        },
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
    console.log(response);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Box
      sx={{
        margin: "160px auto 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        width: "500px",
        borderRadius: "10px",
      }}
    >
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          onChange={handleChange}
          required
          fullWidth
          id="username"
          label="Description"
          multiline
          rows={6}
          name="username"
          autoComplete="off"
          sx={{
            "& .MuiInputBase-root": {
              background: "white",
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
