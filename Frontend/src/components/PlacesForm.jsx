import { useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { sanityClient } from "../../client";

function PlacesForm() {

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setECheckIn] = useState("");
    const [checkOut, setECheckOut] = useState("");
    const [maxGuest, setMaxGuest] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const normalizePhotos = (photos) =>
        photos.map((photo) => ({
            _id: photo._id || null,
            url: photo.url || (typeof photo === "string" ? photo : null),
        }));

    useEffect(() => {
        if (!id) return;

        axios.get("/places/" + id).then((response) => {
            const { data } = response;

            setTitle(data?.title);
            setAddress(data?.address);

            const normalizedPhotos = normalizePhotos(data?.photos || []);
            setAddedPhotos(normalizedPhotos);

            setDescription(data?.description);
            setPerks(data?.perks);
            setExtraInfo(data?.extraInfo);
            setECheckIn(data?.checkIn);
            setECheckOut(data?.checkOut);
            setMaxGuest(data?.maxGuest);
            setPrice(data?.price);
        });
    }, [id]);


    const savePlace = async (ev) => {
        ev.preventDefault();

        if (!title || !address || !addedPhotos || !description || !perks || !extraInfo || !checkIn || !checkOut || !maxGuest || !price) {
            toast.error("Please fill in every details");
            return;
        }

        // savePin();

        setLoading(true);

        if (id) {
            //update an existing place
            await axios.put("/places", {
                id, title, address, addedPhotos: addedPhotos.map(photo => photo.url || photo), description, perks, extraInfo, checkIn, checkOut, maxGuest, price
            });
            setRedirect(true);
            setLoading(false);
        } else {
            //create new place
            await axios.post("/places", {
                title, address, addedPhotos: addedPhotos.map(photo => photo.url || photo), description, perks, extraInfo, checkIn, checkOut, maxGuest, price
            });
            setRedirect(true);
            setLoading(false);
        }
    }

    const deletePlace = async () => {
        try {
            await axios.delete("/places/" + id);
            setRedirect(true);
        } catch (error) {
            alert("Error deleting the your accomodation. Please try again.");
        }
    };

    if (redirect) {
        return <Navigate to={"/account/places"} />
    }


    // const savePin = () => {
    //     if (loading) {
    //         alert("Please wait until the image is uploaded.");
    //         return;
    //     }

    //     const validPhotos = normalizePhotos(addedPhotos).filter(
    //         (photo) => photo._id && typeof photo._id === "string"
    //     );

    //     if (validPhotos.length > 0) {
    //         validPhotos.forEach((photo) => {
    //             const doc = {
    //                 _type: "pin",
    //                 image: {
    //                     _type: "image",
    //                     asset: {
    //                         _type: "reference",
    //                         _ref: photo._id,
    //                     },
    //                 },
    //                 assetId: photo.url,
    //             };

    //             sanityClient
    //                 .create(doc)
    //                 .then(() => {
    //                     console.log("Image saved successfully!");
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error saving image:", error.message);
    //                 });
    //         });
    //     } else {
    //         console.warn("No valid image data available.");
    //     }
    // };






    return (
        <div className="">
            <AccountNav />
            <form onSubmit={savePlace}>
                {/* --------------title-------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Title</h2>
                <input type="text"
                    placeholder="title of your place"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />


                {/* ------------------address-------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Address</h2>
                <input type="text"
                    placeholder="address of your place"
                    value={address}
                    onChange={ev => setAddress(ev.target.value)}
                />


                {/* -------------------------photos------------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Photos</h2>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />


                {/* ---------------------------description------------------------ */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Description</h2>
                <textarea
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />


                {/* --------------------------------amenities--------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Amenities</h2>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    <Perks selected={perks} onChange={setPerks} />
                </div>


                {/* ----------------------------------extra info------------------ */}
                <h2 className="text-2xl font-medium mt-6 pl-1">Extra Info</h2>
                <textarea
                    placeholder="About your place"
                    value={extraInfo}
                    onChange={ev => setExtraInfo(ev.target.value)}
                />


                {/* ------------------------------house rules-------------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">House Rules</h2>
                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="border px-4 pb-1 rounded-2xl">
                        <h3 className="mt-2 mb-2">check-In</h3>
                        <input className=" border border-gray-400 outline-none px-2 rounded-2xl"
                            type="time"
                            value={checkIn}
                            onChange={ev => setECheckIn(ev.target.value)}
                        />
                    </div>

                    <div className="border pb-1 px-4 rounded-2xl">
                        <h3 className="mt-2 mb-2">check-Out</h3>
                        <input className=" border border-gray-400 outline-none px-2 rounded-2xl"
                            type="time"
                            value={checkOut}
                            onChange={ev => setECheckOut(ev.target.value)}
                        />
                    </div>

                    <div className="border px-4 pb-2 rounded-2xl">
                        <h3 className="mt-2 mb-2">Maximum guests</h3>
                        <input className=" border border-gray-400 outline-none px-2 rounded-2xl"
                            type="number"
                            min={1}
                            value={maxGuest}
                            onChange={ev => setMaxGuest(ev.target.value)}
                        />
                    </div>

                    <div className="border px-4 pb-2 rounded-2xl">
                        <h3 className="mt-2 mb-2">Price Per Night ₹</h3>
                        <input className=" border border-gray-400 outline-none px-2 rounded-2xl"
                            type="number"
                            min={100}
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                        />
                    </div>
                </div>


                {/* -------------------------------------button------------------------------- */}
                <div className="flex items-center font-medium justify-around">
                    {id && (
                        <button
                            type="button"
                            className="secondary mt-8 mb-4 max-w-52"
                            onClick={() => setConfirmDelete(true)}
                        >
                            Delete
                        </button>
                    )}

                    {loading ? (
                        <button className="primary mt-8 mb-4 max-w-52 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                        </button>
                    ) : (
                        <button className="primary mt-8 mb-4 max-w-52">Save</button>
                    )}

                </div>
            </form>
            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this place?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="mr-4 px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setConfirmDelete(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={deletePlace}
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
export default PlacesForm