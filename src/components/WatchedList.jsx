function WatchedList({ movie ,DeletingFromList }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
          <p>
            <span>🔃</span>
              <span>{movie.tempRating}times</span>
            
          </p>
      </div>
      <button className="btn-delete" onClick={()=>DeletingFromList(movie.imdbID) }>❌</button>
    </li>
    
  );
}

export default WatchedList;