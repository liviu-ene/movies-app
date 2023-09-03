"use client";

import { getIdFromLocalCookie, getTokenFromLocalCookie } from "@/lib/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewsList from "./ReviewsList/ReviewsList";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const jwt = getTokenFromLocalCookie();
  const user = getIdFromLocalCookie();

  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const movieReviews = response.data.data.filter((review: any) => {
        if (user) {
          return review.attributes.user?.data?.id === parseInt(user);
        }
      });
      setReviews(movieReviews);
    };

    getReviews();
  }, []);

  console.log(reviews);

  return (
    <div>
      <ReviewsList reviews={reviews} />
    </div>
  );
}
