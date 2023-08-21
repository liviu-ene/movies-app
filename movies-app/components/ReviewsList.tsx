"use client";

import { Divider, List, ListItem, ListItemText } from "@mui/material";

export default function ReviewsList({ reviews }) {
  console.log(reviews);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", margin:'auto', borderRadius: '10px' }}>
      {reviews.map((review) => (
        <ListItemText
          primary={review.attributes.title}
          secondary={review.attributes.description}
        />
      ))}
    </List>
  );
}
