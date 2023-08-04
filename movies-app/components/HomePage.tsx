import { getPopularMovies } from "@/lib/api";
import { UserProvider, useUser } from "@/lib/authContext";
import MovieCard from "./MovieCard";
import NavBar from "./NavBar";

import styles from "./HomePage.module.css";

export default async function Home() {
    const popularMovies = await getPopularMovies();
    //const {user, loading} = useUser();
    return (
      <>
        
        <div className={styles.moviesContainer}>
          {popularMovies.map((movie: any) => (
            <MovieCard data={movie} />
          ))}
        </div>
        </>
    );
  }