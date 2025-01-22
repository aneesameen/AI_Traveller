import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../Constants"
import { Link } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"
import { UserContext } from "../context/UserContext"
import { useSearch } from "../context/SearchContext"

function IndexPage() {

    const [allData, setAllData] = useState("");

    const { searchResults, clearSaerchResults } = useSearch();

    const { ready } = useContext(UserContext);

    useEffect(() => {
        try {
            axios.get("/allPlaces").then((response => {
                setAllData(response.data);
            }))
        } catch (error) {
            alert("an error occured");
        }

    }, [])

    if (!ready) {
        return <LoadingScreen />;
    }

    if (searchResults?.length > 0) {
        return (
            <div className="mt-16 mb-16 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {searchResults?.length > 0 && searchResults.map(place => (
                    <Link onClick={clearSaerchResults} to={`/place/${place?._id}`} key={place._id} className="hover:-translate-y-2 duration-200 cursor-pointer">
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place?.photos?.[0] && (
                                // < img className="rounded-2xl aspect-square object-cover" src={`${BASE_URL}uploads/` + place?.photos[0]} alt="image" />
                                < img className="rounded-2xl aspect-square object-cover" src={place?.photos[0]} alt="image" onError={(e) => { e.target.src = "/hotel.png"; }} />
                            )}
                        </div>
                        <h3 className="font-medium truncate text-lg">{place?.address} </h3>
                        <h3 className="text-sm truncate text-gray-600">{place?.title}</h3>
                        <div className="mt-1">
                            <span className="font-medium">₹{place?.price}/night</span>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }


    return (
        <div className="mt-16 mb-16 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allData?.length > 0 && allData.map(place => (
                <Link to={`/place/${place?._id}`} key={place._id} className="hover:scale-105 duration-200 cursor-pointer">
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {place?.photos?.[0] && (
                            // < img className="rounded-2xl aspect-square object-cover" src={`${BASE_URL}uploads/` + place?.photos[0]} alt="image" />
                            < img className="rounded-2xl aspect-square object-cover" src={place?.photos[0]} alt="image" onError={(e) => { e.target.src = "/hotel.png"; }} />
                        )}
                    </div>
                    <h3 className="font-medium truncate text-lg">{place?.address} </h3>
                    <h3 className="text-sm truncate text-gray-600">{place?.title}</h3>
                    <div className="mt-1">
                        <span className="font-medium">₹{place?.price}/night</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
export default IndexPage