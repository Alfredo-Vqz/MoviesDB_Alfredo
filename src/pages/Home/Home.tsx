import { MovieCard } from "../../components/MovieCard";
import { movies } from "../../constants/moviesMock";

const Home = () => {
    return (
        <div className='bg-gray-800'>
            <div className='flex justify-center'>
                <div className='mt-8 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
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
}

export default Home;
