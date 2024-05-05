import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IMovieDetail, getDetails } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { FaHeart, FaRegHeart, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { getRecommendations } from "../../services"; 
import { MovieCard } from "../../components/MovieCard";


const Show = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IMovieDetail>();   
    const [recommendations, setRecommendations] = useState<any[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const getDetailsMovie = async (movieId: number | undefined) => {
        if (movieId !== undefined) { 
            await getDetails(movieId) 
                .then((res) => {
                    if (res && res.data) {
                        console.log(res.data, "res");
                        setMovie(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err, "err")
                });
            setLoading(false);
        }
    }
    
    const getMovieRecommendations = async (movieId: number | undefined) => {
        if (movieId !== undefined) { 
            const res = await getRecommendations(movieId);
            if (res && res.data && res.data.results) {
                setRecommendations(res.data.results);
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        const movieId = id ? parseInt(id) : -1; 
        getDetailsMovie(movieId);
        getMovieRecommendations(movieId);

        const favs = localStorage.getItem('favorites') || "";
        setFavorites(favs);
        if( favs.includes(String(movieId))){
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [id]);
    
    const goBack = () => {
        navigate(-1);
    }

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id];
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }


    return (
<div className='bg-gray-800 min-h-screen bg-cover'>
    <div className='flex justify-center bg-gray-700'>
        <div className='mt-4'>
            <button className="font-serif duration-300 text-2xl bg-gray-900 md:hover:text-blue-500 hover:bg-gray-800 text-white py-3 px-3 rounded-full ml-4" onClick={goBack}> 
                <FaRegArrowAltCircleLeft/>  
            </button>
            <div className="flex flex-row  px-4 py-4">
                <div className="max-w-xs rounded-lg overflow-hidden shadow-lg mr-4">
                    <img className="w-full" src={IMAGE_SOURCE + movie?.poster_path} alt="poster"></img>
                </div>
                <div className="py-4 px-4">
                    <h1 className="font-bold text-white font-serif text-3xl" >
                        {movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})
                    </h1>
                    <h2 className="font-serif text-white opacity-60 text-xl mb-2"> 
                        {movie?.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'} | 
                        {movie?.genres.slice(0, 3).map(genre => genre.name).join(', ')} | {movie?.runtime} m
                    </h2>
                    <div className="flex items-center mb-4">
                        {isFavorite ? (
                            <button className="bg-green-700 hover:bg-green-800 text-white  py-3 px-3 rounded-full" onClick={removeFavorite}> <FaHeart/> </button>
                        ) : (
                            <button className="bg-green-500 hover:bg-green-600 text-white  py-3 px-3 rounded-full" onClick={addFavorite}> <FaRegHeart/> </button>
                        )}
                        <div className="ml-5 flex flex-col">
                            <div className="bg-gray-500 h-2 w-32 rounded-full mb-1">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(movie?.vote_average || 0) * 10}%` }}></div>
                            </div>
                            <span className="font-serif text-white">{movie?.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                    <h3 className="font-serif text-white opacity-60 text-lg">{movie?.tagline}</h3>
                    <h2 className="font-serif text-white opacity-80 text-xl font-bold"> Overview</h2>
                    <h3 className="font-serif text-white opacity-60 text-lg max-w-xl text-justify">{movie?.overview}</h3>
                </div>
            </div>
        </div>
    </div>
    <div className="movie-section px-6 py-2">
        <div className="font-bold text-white font-serif text-3xl mb-4 ml-4">Recommendations</div>
        <div className="slider-container flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
            <div className="flex ml-5 mt-5">
                {recommendations.map((movie) => (
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

export default Show;
