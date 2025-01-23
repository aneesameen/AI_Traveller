import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { SlUser } from "react-icons/sl";
import BookingCard from "../components/BookingCard";
import PhotoGallery from "../components/PhotoGallery";
import LoadingScreen from "../components/LoadingScreen";

function SinglePlacePage() {

    const { id } = useParams();

    const [singlePlace, setSinglePlace] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }
        try {
            axios.get(`/places/${id}`).then((response => {
                setSinglePlace(response.data);
            }))
        } catch (error) {

        }
    }, [id]);

    if (!singlePlace) {
        return (
            <LoadingScreen />
        )
    }



    return (
        <div className="mt-4 pt-8 -mx-8 px-8">

            <h1 className="text-3xl font-medium">{singlePlace?.title}</h1>
            <a className=" flex items-center my-3 gap-1 font-semibold hover:underline" href={`https://www.google.com/maps/?q=${singlePlace?.address}`} target="_blank">
                <FiMapPin />
                {singlePlace?.address}
            </a>

            <PhotoGallery singlePlace={singlePlace} />


            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
                <div>
                    {/* <h2 className="font-medium capitalize">Hosted By : {singlePlace?.owner?.name}</h2> */}
                    <div className="text-md md:text-2xl flex flex-wrap gap-3 items-center">
                        <SlUser className="text-2xl" />
                        <h1 className="font-medium text-2xl">Hosted By : </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="capitalize font-medium text-2xl">
                                {singlePlace?.owner?.name}
                            </h2>
                        </div>
                    </div>

                    <hr className="border border-gray-300 my-6" />

                    <div className="">
                        <h2 className="font-semibold text-2xl mb-4">Description</h2>
                        <h2>{singlePlace?.description}</h2>
                    </div>
                    <hr className="border border-gray-300 my-6" />
                    <div className="flex flex-wrap justify-between items-center">
                        <div>
                            Check-In : {singlePlace?.checkIn} <br />
                            Check-Out : {singlePlace?.checkOut} <br />
                            Max-Guests : {singlePlace?.maxGuest}
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <h2 className="text-xl font-semibold">Amenities</h2>
                            <div className="flex gap-1 flex-wrap">
                                {singlePlace?.perks?.length > 0 && singlePlace?.perks.map((perk, index) => (
                                    <div key={index} className="bg-gray-300 px-4 py-2 rounded-lg">
                                        {perk}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className="border border-gray-300 my-6" />

                </div>

                <div className="relative">
                    <div className="sticky md:top-46 lg:top-28 z-10">
                        <BookingCard singlePlace={singlePlace} />
                    </div>
                </div>

            </div>
            <div>
                <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
            </div>
            <div className="text-sm text-gray-800 mb-4 mt-2">
                {singlePlace?.extraInfo}
            </div>

        </div >
    )
}
export default SinglePlacePage