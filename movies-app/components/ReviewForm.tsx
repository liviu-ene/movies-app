import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function ReviewForm() {
    const handleSubmit = () => {
        console.log('submit');
    }

    const handleChange = () => {
        console.log('change');
    }

    return (
        <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Movie Review
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="Title"
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
            </Grid>
          </Grid>
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
    )
}