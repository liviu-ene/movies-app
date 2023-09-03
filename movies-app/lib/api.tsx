import axios from "axios";

const tmdbAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TMDB_URL,
    headers: {
		Accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTM3MDBjNTFkYTZjNmEwOTAyMTg2NWFmOWRmNjVlMiIsInN1YiI6IjY0MDRkNWQwMzgzZGYyMDBkOTA2ODE0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HKGP--Hotj5xYYc7bscLXiur7Mp0StQw-pECwigehtQ`,
		
	},
})

export const fetcher = (url: URL) => fetch(url).then((res) => res.json());

export const tmdbFetcher = (url: URL) => {
  url.searchParams.append(
    "api_key",
    process.env.NEXT_PUBLIC_TMDB_API_KEY as string
  );
  fetch(url).then((res) => res.json());
};

export const getPopularMovies = async (page: number) => {
  try {
    const response = await tmdbAPI.get(`movie/popular?page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getPopularMovies2 = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=4a3700c51da6c6a09021865af9df65e2`);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
}
