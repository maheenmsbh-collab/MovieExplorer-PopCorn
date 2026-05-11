import { useState } from "react";
import { NavBar } from "./components/Navbar";
import Main from "./components/Main";
import Summary from "./components/Summary";
import MoviesList from "./components/MoviesList";
import { TotalSearch } from "./components/TotalSearch";
import Search from "./components/Search";
import ShowRemove from "./components/ShowRemove";
import MoviesWatched from "./components/MoviesWatched";
import MovieInfo from "./components/MovieInfo.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";


export default function App() {
  const [watched, setWatched] =  useLocalStorage("watched", []);

   
  const [query, setQuery] = useState("");
  const [clickedMovieID, setClickedMovieID] = useState(null);

  const { movies, load, hasError } = useMovies(query);

  function DeletingFromList(id) {
    setWatched((del) => del.filter((movie) => movie.imdbID !== id));
  }

  function handleClickedMovie(id) {
    setClickedMovieID((prev) => (prev === id ? null : id));
  }

  function handleAddToWatch(movie) {
    setWatched((watch) => [...watch, movie]);
    setClickedMovieID(null);
  }

  

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <TotalSearch movies={movies} />
      </NavBar>
      <Main>
        <ShowRemove>
          {hasError ? (
            <p className="error">{hasError}</p>
          ) : load ? (
            <div className="loader">Loading.....</div>
          ) : (
            <MoviesList
              movies={movies}
              handleClickedMovie={handleClickedMovie}
            />
          )}
        </ShowRemove>
        <ShowRemove>
          {clickedMovieID ? (
            <MovieInfo
              clickedMovieID={clickedMovieID}
              handleClickedMovie={handleClickedMovie}
              handleAddToWatch={handleAddToWatch}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MoviesWatched
                watched={watched}
                DeletingFromList={DeletingFromList}
              />
            </>
          )}
        </ShowRemove>
      </Main>
    </>
  );
}
