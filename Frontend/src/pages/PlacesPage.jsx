import { Link, Navigate, useParams } from "react-router-dom"
import { FiPlus } from "react-icons/fi";
import PlacesForm from "../components/PlacesForm";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";
import LoadingScreen from "../components/LoadingScreen";

function PlacesPage() {
    const [places, setPlaces] = useState("");

    useEffect(() => {
        axios.get("/user-places").then(({ data }) => {
            setPlaces(data);
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center mt-20">
                <Link className="inline-flex gap-2 items-center bg-primary text-white font-medium py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <FiPlus className="text-white" />
                    Add your own Place
                </Link>
            </div>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
                {places.length > 0 && places.map(place => (
                    <Link to={`/account/places/${place._id}`} className="flex cursor-pointer gap-4 bg-gray-300 hover:bg-primary transition duration-500 ease-in-out p-1 rounded-2xl" key={place}>
                        <div className=" flex w-32 h-full bg-gray-300 rounded-2xl shrink-0">
                            {place.photos.length > 0 && (
                                <img className="object-cover rounded-2xl" src={`${BASE_URL}uploads/` + place?.photos[0]} alt="image" />
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl font-medium">{place?.title}</h2>
                            <p className="line-clamp-3 md:line-clamp-4 text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default PlacesPage