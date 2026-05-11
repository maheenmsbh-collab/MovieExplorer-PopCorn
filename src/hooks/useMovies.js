import { useEffect, useState } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);
  const [hasError, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function ApiMovies() {
      try {
        setError("");
        setLoad(true);

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=3b5f561&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);

        const data = await response.json();

        if (data.Response === "False") throw new Error("SEARCHED MOVIE NOT FOUND");

        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          setMovies([]); 
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoad(false);
        }
      }
    }

    if (query.length >= 3) {
      ApiMovies();
    } else {
      setError("Search Movies...");
      setMovies([]);
    }

    return () => controller.abort();
  }, [query]);

  return { movies, load, hasError };
}
