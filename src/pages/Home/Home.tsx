import React, { useEffect, useState } from "react";
import { IMovieResponse, getPopularMovies, getTopRated, getUpcoming } from "../../services";
import { MovieCard } from "../../components/MovieCard";
import "./Home.css"

const Home: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const popularRes = await getPopularMovies();
            const topRatedRes = await getTopRated();
            const upcomingRes = await getUpcoming();

            if (popularRes && popularRes.data && topRatedRes && topRatedRes.data && upcomingRes && upcomingRes.data) {
                setPopularMovies(popularRes.data.results);
                setTopRatedMovies(topRatedRes.data.results);
                setUpcomingMovies(upcomingRes.data.results);
            }
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="bg-gray-800">
            {loading && <div>Loading...</div>}
            {error && <div>Error...</div>}
            
            <div className="movie-section px-6 py-8">
                <div className="font-bold text-white font-serif text-3xl mb-4 ml-4">Popular</div>
                <div className="slider-container flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                    <div className="flex ml-5 mt-5">
                        {popularMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                genreId={movie.genre_ids[0]}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="movie-section px-6 py-2">
                <div className="font-bold text-white font-serif text-3xl mb-4 ml-4">Top Rated</div>
                <div className="slider-container flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                    <div className="flex ml-5 mt-5">
                        {topRatedMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                genreId={movie.genre_ids[0]}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="movie-section px-6 py-2">
                <div className="font-bold text-white font-serif text-3xl mb-4 ml-4">Upcoming</div>
                <div className="slider-container flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                    <div className="flex ml-5 mt-5">
                        {upcomingMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                genreId={movie.genre_ids[0]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
