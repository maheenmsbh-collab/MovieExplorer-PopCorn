import WatchedList from "./WatchedList";

function MoviesWatched({ watched,DeletingFromList }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedList movie={movie} key={index}
        DeletingFromList={DeletingFromList} />
      ))}
    </ul>
  );
}

export default MoviesWatched;
