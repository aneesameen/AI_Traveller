import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "../services/GlobalApi";
import { Link } from "react-router-dom";


function UserTripCardItem({ trip }) {
    const [photo, setPhoto] = useState();

    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip])

    const getPlacePhoto = async () => {
        try {
            const data = {
                textQuery: trip?.userSelection?.location?.label
            };

            const resp = await GetPlaceDetails(data);

            if (resp?.places?.[0]?.photos?.[9]?.name) {
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.places[0].photos[1].name);
                setPhoto(photoUrl);
            } else {
                console.error("No photo found for the place");
                setPhoto("/placeholder.jpg");
            }
        } catch (error) {
            console.error("Error in getPlacePhoto:", error.message || error);
            setPhoto("/placeholder.jpg");
        }
    };


    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className="hover:scale-105 transition-all rounded-xl">
                <img className="rounded-xl h-[180px] w-full object-cover" src={photo ? photo : '/placeholder.jpg'} alt="" />

                <div className="mt-5 px-2">
                    <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                    <p className="text-sm tex-gray-500">{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</p>
                </div>
            </div>
        </Link>
    )
}
export default UserTripCardItem