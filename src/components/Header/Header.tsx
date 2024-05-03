import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import mvlogo from "./mvlogo.jpg";

const Header: React.FC = () => {
    return (
        <nav className="bg-gray-900 border-gray-700">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <div className="flex items-center">
                    <img src={mvlogo} alt="Logo" className="w-12 h-12 rounded-lg mr-4" />
                    <span className="text-2xl font-semibold whitespace-nowrap text-white font-extrabold font-serif">
                        <Link to={ROUTES.HOME}>MoviesDB</Link>
                    </span>
                </div>
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900 text-white">
                    <li>
                        <Link className="duration-300 font-serif block py-2 px-3 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0" to={ROUTES.POPULAR}>Popular</Link>
                    </li>
                    <li>
                        <Link className="duration-300 font-serif block py-2 px-3 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0" to={ROUTES.TOPRATED}>Top Rated</Link>
                    </li>
                    <li>
                        <Link className="duration-300 font-serif block py-2 px-3 hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0" to={ROUTES.UPCOMING}>Upcoming</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
