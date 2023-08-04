"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, IconButton, Modal, Popover } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { posterConstructor } from "@/lib/helpers";

import styles from "./MovieCard.module.css";
import { useFetchUser } from "@/lib/authContext";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

export default function MovieCard(props: any) {
  const { title, poster_path, release_date } = props.data;
  const { user } = useFetchUser();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [modal, setModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      //This enables the popover
      setAnchorEl(event.currentTarget);
      return;
    }

    setModal(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const year = release_date?.split("-")[0];
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="450"
          image={posterConstructor(poster_path, 300)}
          alt={title}
        />
        <CardContent>
          <Box className={styles.cardSubContent}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <IconButton aria-label="review" onClick={handleClick}>
              <RateReviewIcon />
            </IconButton>
            <Modal
              open={modal}
              onClose={() => setModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ReviewForm />
            </Modal>
            <Popover
              id="reviewPopover"
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                You need to log in to be able to write a review.
              </Typography>
            </Popover>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
