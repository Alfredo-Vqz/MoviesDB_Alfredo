import { useEffect, useState } from "react";
import { IMovieResponse, getTopRated } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const TopRated: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMovies, setErrorMovies] = useState<boolean>(false);

    const getTop = async () => {
        await getTopRated()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res");
                    setMovies(res.data.results);
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getTop();
    }, []);

    return (
        <div className="bg-gray-800">
            <div className='flex justify-center'>
                {loading && <div> Loading... </div>}
                {errorMovies && <div> Error... </div>}
                <div className='grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8'>
                    {movies.map((movie, index) => (
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
    );
};

export default TopRated;
