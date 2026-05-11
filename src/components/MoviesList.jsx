import Movie from "./Movie";

function MoviesList({ movies, handleClickedMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie, index) => (
        <Movie
          movie={movie}
          key={index}
          handleClickedMovie={handleClickedMovie}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
