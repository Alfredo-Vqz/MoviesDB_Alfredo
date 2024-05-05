import { IMovieCard } from "./types";
import { Pill } from "../Pill";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import genresData from '../../constants/genres.json';
import './MovieCard.css'
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";
import { ROUTES } from "../../routes/constants";

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath
}) => {
    const navigate = useNavigate();
    const poster = IMAGE_SOURCE + posterPath;

    const getGenre = (id: number): string => {
        const genre = genresData.genres.find((genre) => genre.id === id);
        return genre?.name || 'Uknown';
    }

    const navigateMovies = ( id: number, movieName: string ) => {
        navigate(`${ROUTES.SHOW}${id}`, { state: { name: movieName }});
    }

    return (
        <div 
    className="group show-box"
    onClick={() => {
        navigateMovies(movieId, title)
    }}
>
    <div className="min-w-[100%] overflow-hidden ml-0 bg-[#2f3238] float-none relative">
        <img className="h-[370px] max-w-none min-w-[100%] overflow-hidden" src={poster} alt="poster"></img>
        <div className="info opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white pt-[15px] pr-[10px] pb-[15px] pl-[10px] w-[100%] align-middle">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Pill title={getGenre(genreId)} color="red"></Pill>
                </div>
                <p className="block text-[19px] font-bold leading-[27px] mt-[10px] w-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{title}</p>
                <p className="mr-[10px] text-[13px] font-medium table uppercase leading-[20px] w-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{voteAverage.toFixed(1)} / 10</p>
                </div>
            </div>
        </div>
    </div>

    )
}

export default MovieCard;