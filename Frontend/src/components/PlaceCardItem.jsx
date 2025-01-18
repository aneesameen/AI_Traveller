import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { GetPlaceDetails, PHOTO_REF_URL } from "../services/GlobalApi";




function PlaceCardItem({ place }) {
    const [photo, setPhoto] = useState();

    useEffect(() => {
        place && getPlacePhoto();
    }, [place])

    const getPlacePhoto = async () => {
        try {
            const data = {
                textQuery: place?.placeName
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
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target="_blank">
            <div className="border rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 hover:text-black transition-all hover:shadow-md cursor-pointer h-[200px] w-full overflow-hidden">
                <img src={photo ? photo : "/placeholder.jpg"} className="h-full object-cover w-[130px] rounded-xl" />
                <div className="flex flex-col justify-between overflow-hidden">
                    <div className="flex-grow overflow-hidden">
                        <h2 className="font-bold text-lg truncate">{place?.placeName}</h2>
                        <p className="text-sm text-gray-600 line-clamp-3">{place?.placeDetails || place?.details}</p>
                    </div>
                    <div>
                        <h2 className="mt-2 text-sm text-primary truncate">⏰{place?.bestTimeToVisit}</h2>
                        <p className="mt-2 text-sm text-gray-500 truncate">💲 {place?.ticketPricing}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default PlaceCardItem