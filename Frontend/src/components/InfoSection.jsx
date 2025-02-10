import { GetPlaceDetails, PHOTO_REF_URL } from "../services/GlobalApi"
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import { SlCalender } from "react-icons/sl";
import { GiMoneyStack } from "react-icons/gi";
import { IoPeopleSharp } from "react-icons/io5";


function InfoSection({ trip, deleteTrip, confirmDelete, setConfirmDelete }) {

    const [photo, setPhoto] = useState([]);


    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            getPlacePhoto();
        }
    }, [trip?.userSelection?.location?.label]);

    const getPlacePhoto = async () => {
        const textQuery = trip?.userSelection?.location?.label;

        if (!textQuery) {
            return;
        }

        const data = { textQuery };

        try {
            const resp = await GetPlaceDetails(data);

            if (resp?.places?.[0]?.photos?.length) {
                const photoUrls = resp.places[0].photos.slice(0, 9).map((photo) => {
                    return PHOTO_REF_URL.replace("{NAME}", photo.name);
                });
                setPhoto(photoUrls);
            } else {
                console.error("No valid photo data found in response.");
                setPhoto(["/placeholder.jpg"]);
            }

        } catch (error) {
            console.error("Error in getPlacePhoto:", error);
            setPhoto("/placeholder.jpg");
        }
    };



    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <img
                    src={photo[0] ? photo[0] : '/placeholder.jpg'}
                    className="h-[340px] w-full object-cover rounded-xl shadow-lg"
                    alt="Place Photo 1"
                />
                <img
                    src={photo[1] ? photo[1] : '/placeholder.jpg'}
                    className=" hidden md:flex h-[340px] w-full object-cover rounded-xl shadow-lg"
                    alt="Place Photo 2"
                />
                <img
                    src={photo[2] ? photo[2] : '/placeholder.jpg'}
                    className=" hidden lg:flex h-[340px] w-full object-cover rounded-xl shadow-lg"
                    alt="Place Photo 3"
                />
            </div>





            <div className="my-5 flex flex-col gap-2">
                <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md md:text-md flex items-center gap-2"><SlCalender /> {trip?.userSelection?.noOfDays}  Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md md:text-md flex items-center gap-2"> <GiMoneyStack /> {trip?.userSelection?.budget}</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-md md:text-md flex items-center gap-2"><IoPeopleSharp /> No of travellers {trip?.userSelection?.traveller}</h2>
                    </div>
                    <div>
                        <Button className="bg-secondary hover:bg-secondary" onClick={() => setConfirmDelete(true)}>Delete Trip</Button>
                    </div>
                </div>
            </div>

            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this Trip?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="mr-4 px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setConfirmDelete(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={deleteTrip}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
export default InfoSection