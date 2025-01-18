import { FaHotel } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { BASE_URL } from "../Constants";
import Search from "./Search";
import { useSearch } from "../context/SearchContext";
import { Button } from "./ui/button";

function Header() {
    const [openProfile, setOpenProfile] = useState(false);

    // const Luser = JSON.parse(localStorage.getItem("user"));
    // useEffect(() => {
    //     console.log(Luser);
    // }, [])


    const openDialog = () => {
        setOpenProfile(!openProfile);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
                setOpenProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { user, luser } = useContext(UserContext);
    const { clearSaerchResults } = useSearch()


    return (
        <div>
            <header className="flex justify-between items-center">

                <Link onClick={clearSaerchResults} to={'/main'} className='cursor-pointer flex flex-col items-center justify-center'>
                    <img src='/logo.svg' className='w-14 md:w-20' alt="Logo" />
                    <h2 className='font-bold text-sm md:text-md'>TRAVELLER</h2>
                </Link>

                <Search />

                <div className="relative cursor-pointer">
                    <div
                        onClick={openDialog}
                        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 profile-button">

                        <RxHamburgerMenu className="h-5 w-5" />
                        <div >
                            {luser ? (
                                <div className="h-7 w-7 rounded-full overflow-hidden">
                                    <img src={luser.picture} className="h-full w-full object-cover" alt="" />
                                </div>
                            ) :
                                <div className="bg-gray-500 text-white rounded-full p-1 border border-gray-500 overflow-hidden">
                                    <FaUser />
                                </div>
                            }
                        </div>
                        {!!(user || luser) && (
                            <div className="flex font-medium capitalize">
                                {user?.name || luser?.name}
                            </div>
                        )}

                    </div>

                    {openProfile && (
                        <div className="absolute z-10 border bg-white whitespace-nowrap flex gap-2 items-start flex-col px-8 pr-16 py-5 top-12 right-6 rounded-lg shadow shadow-gray-600 profile-dropdown">
                            {user || luser ? (
                                <>
                                    <Link to={'/account'} onClick={() => setOpenProfile(false)} className="hover:text-primary hover:underline font-semibold text-lg">
                                        Profile
                                    </Link>
                                    <Link to={'/account/bookings'} onClick={() => setOpenProfile(false)} className="hover:text-primary hover:underline font-semibold text-lg">
                                        My Bookings
                                    </Link>
                                    <Link to={'/account/places'} onClick={() => setOpenProfile(false)} className="hover:text-primary hover:underline font-semibold text-lg">
                                        My Accommodations
                                    </Link>
                                    <Link to={'/create-trip'} onClick={() => setOpenProfile(false)} className="hover:text-primary hover:underline font-semibold text-lg">
                                        Create Itenarary
                                    </Link>
                                    <Link to={'/my-trips'} onClick={() => setOpenProfile(false)} className="hover:text-primary hover:underline font-semibold text-lg">
                                        View Trips
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={'/login'} onClick={() => setOpenProfile(false)} className="hover:text-primary hover:underline font-semibold text-lg">
                                        Login
                                    </Link>
                                    <Link to={'/signup'} onClick={() => setOpenProfile(false)} className="hover:text-primary hover:underline font-semibold text-lg">
                                        SignUp
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;
