import axios from "axios";
import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearch } from "../context/SearchContext";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { UserContext } from "../context/UserContext";

function Search() {

    const { setSearchResults } = useSearch();
    const location = useLocation();

    const { user, luser } = useContext(UserContext)

    const [searchQuery, setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('/search', { params: { query: searchQuery } });
            setSearchResults(response.data);
            setSearchQuery("")
            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };


    return (
        <>
            {location.pathname === "/main" && (
                <div className="flex gap-10">
                    <div className="z-10 mx-auto rounded-full fixed top-16 left-0 right-0 w-80 bg-white border-t border-gray-300 py-2 px-4 shadow-md md:static md:w-auto md:bg-transparent md:border md:rounded-full md:py-1 md:px-4 md:shadow-none flex items-center justify-center gap-2">
                        <input
                            type="search"
                            className="flex-grow outline-none"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button onClick={handleSearch} className="bg-primary text-white p-2 rounded-full">
                            <IoSearch />
                        </button>
                    </div>
                    <div className="hidden lg:flex gap-5">
                        <div >
                            {user || luser ? (
                                <Link to="/create-trip">
                                    <Button>Create An Itinerary</Button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <Button>Create An Itinerary</Button>
                                </Link>
                            )}
                        </div>
                        <div>
                            {user || luser ? (
                                <Link to="/my-trips">
                                    <Button>View Trips</Button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <Button>View Trips</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Search