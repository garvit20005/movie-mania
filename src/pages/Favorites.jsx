
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import "../css/Favorites.css";

function Favorites() {

    const { favorites, removeFromFavorites } = useMovieContext();

    const clearFavorites = () => {
        if (window.confirm("Remove all movies from favorites?")) {
            favorites.forEach(movie => removeFromFavorites(movie.id));
        }
    };

    return (
        <div className="favorites">

            <div className="favorites-header">
                <div>
                    <h1>My Favorites ❤️</h1>
                    <p>
                        {favorites.length} movies in your collection
                    </p>
                </div>

                {favorites.length > 0 && (
                    <button
                        className="clear-favorites"
                        onClick={clearFavorites}
                    >
                        Clear All
                    </button>
                )}
            </div>

            {favorites.length > 0 ? (

                <div className="favorites-grid">

                    {favorites.map(movie => (
                        <MovieCard
                            movie={movie}
                            key={movie.id}
                        />
                    ))}

                </div>

            ) : (

                <div className="favorites-empty">

                    <div className="empty-icon">💔</div>

                    <h2>No Favorite Movies Yet</h2>

                    <p>
                        You haven't added any movies to your
                        favorites collection.
                    </p>

                    <Link to="/" className="explore-button">
                        Explore Movies
                    </Link>

                </div>

            )}

        </div>
    );
}

export default Favorites;
