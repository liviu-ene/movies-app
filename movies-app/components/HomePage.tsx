import { getPopularMovies } from "@/lib/api";
import { UserProvider, useUser } from "@/lib/authContext";
import MovieCard from "./MovieCard";
import NavBar from "./NavBar";

export default async function Home() {
    const popularMovies = await getPopularMovies();
    //const {user, loading} = useUser();
    return (
      <UserProvider>
        <NavBar />
        <div>
          {popularMovies.map((movie: any) => (
            <MovieCard data={movie} />
          ))}
        </div>
      </UserProvider>
    );
  }