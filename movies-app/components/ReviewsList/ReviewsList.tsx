"use client";

import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemText,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

import styles from "./ReviewsList.module.css";
import { useState } from "react";
import ReviewForm from "../ReviewForm";
import { getTokenFromLocalCookie } from "@/lib/auth";
import axios from "axios";

export default function ReviewsList({ reviews }: any) {
  const [modal, setModal] = useState(false);
  const jwt = getTokenFromLocalCookie();
  const handleEdit = () => {
    setModal(true);
  };

  const handleDelete = async(id: number) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }
  return (
    <List className={styles.reviewsList}>
      {reviews.map((review: any, index: number) => (
        <>
          <Box className={styles.reviewItem}>
            <ListItemText
              primary={review.attributes.title}
              secondary={review.attributes.description}
            />
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(review.id)}>
              <DeleteIcon />
            </IconButton>
            <Modal
              open={modal}
              onClose={() => setModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ReviewForm title={review.attributes.title} requestType='PUT' reviewId={review.id} />
            </Modal>
          </Box>
          {index !== reviews.length - 1 ? <Divider /> : ""}
        </>
      ))}
    </List>
  );
}
