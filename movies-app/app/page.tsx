import MovieCard from "@/components/MovieCard";
import NavBar from "@/components/NavBar";
import { getPopularMovies } from "@/lib/api";
import styles from "./page.module.css";

export default async function Home() {
  const popularMovies = await getPopularMovies();
  return (
    <>
      <NavBar />
      <div className={styles.movies_container}>
        {popularMovies.map((movie: any) => (
          <MovieCard data={movie} />
        ))}
      </div>
    </>
  );
}
