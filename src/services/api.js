
const BASE_URL = "/.netlify/functions/movies";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}?type=popular`);

    if (!response.ok) {
        throw new Error("Failed to load popular movies");
    }

    const data = await response.json();
    return data.results || [];
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}?type=search&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    const data = await response.json();
    return data.results || [];
};
