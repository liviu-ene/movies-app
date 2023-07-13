
import MovieCard from "@/components/MovieCard";
import NavBar from "@/components/NavBar";
import { getPopularMovies } from "@/lib/api";
import { UserProvider, useUser } from "@/lib/authContext";
import styles from "./page.module.css";
import Home from "@/components/HomePage";

export default async function HomePage() {
  return (
    <Home/>
  );
}
