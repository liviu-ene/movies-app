import MovieCard from "@/components/MovieCard";
import { getPopularMovies } from "@/lib/api";


export default async function Home() {
const popularMovies = await getPopularMovies();
console.log(popularMovies);
  return <div>{popularMovies.map((movie) => <MovieCard props={movie}/>)}</div>;
}
