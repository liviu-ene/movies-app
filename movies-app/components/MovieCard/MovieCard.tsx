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
import { useEffect, useRef, useState } from "react";
import ReviewForm from "../ReviewForm";
import { useAppSelector } from "@/redux/store";

export default function MovieCard(props: any) {
  const {data, isLast, newLimit} = props;
  const { title, poster_path, release_date } = data;
  const isLoggedIn = useAppSelector(state => state.authReducer.user.isLoggedIn);
  const { user } = useFetchUser();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [modal, setModal] = useState(false);
  const cardRef = useRef<HTMLDivElement >(null);

  //Pagination
  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  //Review modal
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
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
    <Card sx={{ maxWidth: 300 }} ref={cardRef}>
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
              <ReviewForm title={title} requestType='POST'/>
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
