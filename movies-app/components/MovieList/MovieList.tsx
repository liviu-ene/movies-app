"use client";

import { getPopularMovies } from "@/lib/api";
import { UserProvider, useUser } from "@/lib/authContext";
import MovieCard from "../MovieCard/MovieCard";
import NavBar from "../NavBar";

import styles from "./MovieList.module.css";
import { useEffect, useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const fetchMovies = async () => {
    const popularMovies = await getPopularMovies(page);
    setMovies((prev) => [...prev, ...popularMovies]);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <>
      <div className={styles.moviesContainer}>
        {movies.map((movie: any, index) => (
          <MovieCard
            data={movie}
            isLast={index === movies.length - 1}
            newLimit={() => setPage(page + 1)}
          />
        ))}
      </div>
    </>
  );
}
