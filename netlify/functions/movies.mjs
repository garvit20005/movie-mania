
export default async (request) => {
    try {
        const url = new URL(request.url);

        const type = url.searchParams.get("type");
        const query = url.searchParams.get("query");

        const API_KEY = process.env.TMDB_API_KEY;

        if (!API_KEY) {
            return Response.json(
                { error: "TMDB API key is not configured" },
                { status: 500 }
            );
        }

        let endpoint;

        if (type === "popular") {
            endpoint = "/movie/popular";
        } else if (type === "search" && query?.trim()) {
            endpoint = "/search/movie";
        } else {
            return Response.json(
                { error: "Invalid request" },
                { status: 400 }
            );
        }

        const tmdbUrl = new URL(
            `https://api.themoviedb.org/3${endpoint}`
        );

        tmdbUrl.searchParams.set("api_key", API_KEY);

        if (type === "search") {
            tmdbUrl.searchParams.set("query", query.trim());
        }

        const response = await fetch(tmdbUrl);

        if (!response.ok) {
            return Response.json(
                { error: "TMDB request failed", status: response.status },
                { status: response.status }
            );
        }

        const data = await response.json();

        return Response.json(data);

    } catch (error) {
        console.error("Movie API Error:", error);

        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};
