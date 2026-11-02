
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import {
    searchMovies,
    getPopularMovies
} from "../services/api";

import "../css/Home.css";

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("popular");
    const [isSearching, setIsSearching] = useState(false);

    const loadPopularMovies = async () => {
        setLoading(true);
        setError("");
        setIsSearching(false);
        setSearchQuery("");
        setSortBy("popular");

        try {
            const data = await getPopularMovies();
            setMovies(data);
        } catch (err) {
            console.error(err);
            setError("Unable to load movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e?.preventDefault();

        const query = searchQuery.trim();

        if (!query) {
            setError("Please enter a movie name.");
            return;
        }

        setLoading(true);
        setError("");
        setIsSearching(true);

        try {
            const results = await searchMovies(query);
            setMovies(results);
            setSortBy("popular");
        } catch (err) {
            console.error(err);
            setMovies([]);
            setError("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSearchQuery("");
        loadPopularMovies();
    };

    const sortedMovies = [...movies].sort((a, b) => {

        if (sortBy === "rating") {
            return (b.vote_average || 0) - (a.vote_average || 0);
        }

        if (sortBy === "newest") {
            return new Date(b.release_date || 0) -
                   new Date(a.release_date || 0);
        }

        return 0;
    });

    return (
        <div className="home">

            <section className="hero-section">

                <h1>Discover Movies</h1>

                <p>
                    Explore popular movies and find your next favorite.
                </p>

                <form
                    onSubmit={handleSearch}
                    className="search-form"
                >

                    <input
                        type="text"
                        placeholder="Search your favorite movie..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {searchQuery && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={handleClear}
                        >
                            ✕
                        </button>
                    )}

                    <button
                        type="submit"
                        className="search-button"
                        disabled={loading}
                    >
                        Search
                    </button>

                </form>

            </section>

            <section className="movie-section">

                <div className="section-header">

                    <div>
                        <h2>
                            {isSearching ? "Search Results" : "Popular Movies"}
                        </h2>

                        <p>
                            {loading
                                ? "Finding movies..."
                                : `${movies.length} movies found`}
                        </p>
                    </div>

                    <div className="movie-controls">

                        {isSearching && (
                            <button
                                className="reset-button"
                                onClick={loadPopularMovies}
                            >
                                ← Popular Movies
                            </button>
                        )}

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                            aria-label="Sort movies"
                        >
                            <option value="popular">Default Order</option>
                            <option value="rating">Top Rated</option>
                            <option value="newest">Newest First</option>
                        </select>

                    </div>

                </div>

                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={isSearching ? handleSearch : loadPopularMovies}>
                            Retry
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading movies...</p>
                    </div>
                ) : movies.length > 0 ? (

                    <div className="movies-grid">

                        {sortedMovies.map(movie => (
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                            />
                        ))}

                    </div>

                ) : !error ? (

                    <div className="no-results">
                        <span>🎬</span>
                        <h2>No Movies Found</h2>
                        <p>Try searching with another movie name.</p>

                        <button onClick={loadPopularMovies}>
                            Explore Popular Movies
                        </button>
                    </div>

                ) : null}

            </section>

        </div>
    );
}

export default Home;
