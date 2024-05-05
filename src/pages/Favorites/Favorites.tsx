import { useEffect, useState } from "react";
import { IMovieDetail, getDetails } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Favorites = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";

    const runGetFavorites = async () => {
        if (favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favoriteId: number) => {
                    return getDetails(favoriteId)
                        .then((res) => {
                            if (res && res.data) {
                                return res.data;
                            }
                        }).catch((err) => {
                            console.log(err, "err");
                        });
                })
            );
            setShows(newShows);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
    }, [])

    return (
        <div className="bg-gray-800 h-screen">
            <div className='flex justify-center'>
                {shows.length === 0 && !loading && <div className="font-bold text-white opacity-80 font-serif text-3xl mt-10 mr-auto ml-80"> It looks like you haven't added any favorite movies yet.</div>}
                {loading && <div>Loading...</div>}
                {shows.length > 0 && (
                    <div className='grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8'>
                        {shows.map((movie: IMovieDetail) => (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                genreId={movie.genres[0].id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;