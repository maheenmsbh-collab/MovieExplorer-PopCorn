import { useEffect, useState } from "react";
import { UserRating } from "./UserRating";

function MovieInfo({
  clickedMovieID,
  handleClickedMovie,
  handleAddToWatch,
  watched,
}) {
  const [choosedMovie, setChoosedMovie] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [temprRatingClicked, setRatingClicked] = useState(0);

  const isAlreadyWatched = watched.some((w) => w.imdbID === clickedMovieID);

  const watchedMovieRating = watched.find(
    (r) => r.imdbID === clickedMovieID
  )?.userRating;

  function handleTempRatingClicked(origRating) {
    setUserRating(origRating);
    setRatingClicked((tempClicked) => tempClicked + 1);
  }

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        handleClickedMovie(null);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleClickedMovie]);

  useEffect(() => {
    async function gettingMovieInfo() {
      try {
        setInfoLoading(true);
        setInfoError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=3b5f561&i=${clickedMovieID}`
        );

        if (!res.ok) throw new Error("Failed to fetch movie details");

        const info = await res.json();
        if (info.Response === "False") throw new Error(info.Error);

        setChoosedMovie(info);
        setUserRating(0);
        setRatingClicked(0);
      } catch (error) {
        setInfoError(error.message);
      } finally {
        setInfoLoading(false);
      }
    }
    console.log("MovieInfo");

    if (clickedMovieID) gettingMovieInfo();
  }, [clickedMovieID]);

  useEffect(() => {
    if (choosedMovie?.Title) {
      document.title = choosedMovie.Title;
    }

    return () => {
      document.title = "usePop-corn";
    };
  }, [choosedMovie]);

  if (infoLoading) return <p className="loader">Loading movie details...</p>;

  return (
    <div className="details">
      <button className="btn-back" onClick={() => handleClickedMovie(null)}>
        ⬅
      </button>

      {infoError && <p className="error">{infoError}</p>}

      {choosedMovie && (
        <>
          {(() => {
            const {
              Poster,
              Title,
              Released,
              Runtime,
              Genre,
              imdbRating,
              Plot,
              Actors,
              Director,
            } = choosedMovie;

            return (
              <>
                <header className="details-header">
                  {Poster && Poster !== "N/A" ? (
                    <img src={Poster} alt={Title} />
                  ) : (
                    <div className="poster-fallback">No Image</div>
                  )}

                  <div className="details-overview">
                    <h2>{Title}</h2>
                    <p>
                      {Released} - {Runtime}
                    </p>
                    <p>{Genre}</p>
                    <p>
                      <span style={{ color: "#f1c40f" }}>
                        ⭐ {imdbRating} IMDb rating
                      </span>
                    </p>
                  </div>
                </header>

                <div className="rating">
                  {isAlreadyWatched ? (
                    <p className="already-watched">
                      You already rated this movie: {watchedMovieRating}
                    </p>
                  ) : (
                    <>
                      <UserRating
                        rating={userRating}
                        setRating={handleTempRatingClicked}
                      />

                      {userRating > 0 && (
                        <button
                          className="btn-add"
                          onClick={() =>
                            handleAddToWatch({
                              ...choosedMovie,
                              userRating,
                              tempRating: temprRatingClicked, 
                              imdbRating: Number(choosedMovie.imdbRating),
                              runtime: Number(
                                choosedMovie.Runtime.split(" ")[0]
                              ),
                            })
                          }
                        >
                          Add to Watched
                        </button>
                      )}
                    </>
                  )}
                </div>

                <section className="details-plot">
                  <p>
                    <em>{Plot}</em>
                  </p>
                  <p>
                    <strong>Starring:</strong> {Actors}
                  </p>
                  <p>
                    <strong>Directed by:</strong> {Director}
                  </p>
                </section>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}

export default MovieInfo;
