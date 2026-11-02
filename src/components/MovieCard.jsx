
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {

    const {
        isFavorite,
        addToFavorites,
        removeFromFavorites
    } = useMovieContext();

    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();

        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://placehold.co/500x750/1a1a1a/ffffff?text=No+Poster";

    return (
        <div className="movie-card">

            <div className="movie-poster">

                <img
                    src={poster}
                    alt={movie.title}
                    loading="lazy"
                />

                <div className="movie-overlay">

                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                        title={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {favorite ? "♥" : "♡"}
                    </button>

                    <div className="movie-rating">
                        ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10
                    </div>

                </div>

            </div>

            <div className="movie-info">

                <h3 title={movie.title}>{movie.title}</h3>

                <p>
                    {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "Release date unavailable"}
                </p>

            </div>

        </div>
    );
}

export default MovieCard;
