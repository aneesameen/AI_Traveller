import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import { BASE_URL } from "../Constants";
import { FiMapPin } from "react-icons/fi";
import PhotoGallery from "../components/PhotoGallery";
import { differenceInCalendarDays, format } from "date-fns";
import { SlCalender } from "react-icons/sl";

function SingleBookingPage() {

    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get("/bookings").then((response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            }))
        }
    }, [id]);

    const deleteBooking = async () => {
        try {
            await axios.delete("/booking/" + id);
            setRedirect(true);
        } catch (error) {
            alert("error while deleting")
        }
    }

    if (!booking) {
        return "";
    }

    if (redirect) {
        return <Navigate to={"/account/bookings"} />
    }

    return (
        <div className="my-8">
            {/* <h1 className="text-3xl font-medium">{booking?.place?.title}</h1> */}
            <Link to={`/place/${booking?.place?._id}`} className="text-3xl font-medium">{booking?.place?.title}</Link>
            <a className=" flex items-center my-3 gap-1 font-semibold hover:underline" href={`https://www.google.com/maps/?q=${booking?.place?.address}`} target="_blank">
                <FiMapPin />
                {booking?.place?.address}
            </a>

            <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                <h2 className="text-xl">Your Booking Information</h2>
                <div className="py-3 grow grid grid-cols-1 md:grid-cols-3 items-center justify-around">
                    <div className="border-t border-gray-300 mb-2">
                        <div className="text-sm text-gray-900  mt-2 py-2 flex items-center gap-2">
                            <SlCalender />
                            From: {format(new Date(booking.checkIn), "dd-mm-yyyy")} &rarr; To: {format(new Date(booking.checkOut), "dd-mm-yyyy")}
                        </div>
                        <div className="flex gap-10">
                            <div className="text-md">
                                For : {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Days <br />
                            </div>
                            <div className="text-md capitalize">
                                Resident: {booking?.name}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="border-gray-300">
                            <div className="font-medium mt-4">Total Price</div>
                            <div className="text-xl font-medium">₹ {booking?.price}</div>
                        </div>
                        <div className="mt-4">
                            <button onClick={() => setConfirmDelete(true)} className="secondary">Cancel Booking</button>
                        </div>
                    </div>

                    {confirmDelete && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-md shadow-md">
                                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                                <p>Are you sure you want to cancel this booking?</p>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="mr-4 px-4 py-2 bg-gray-300 rounded"
                                        onClick={() => setConfirmDelete(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={deleteBooking}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}



                </div>
            </div>

            <PhotoGallery singlePlace={booking?.place} />
        </div >
    )
}
export default SingleBookingPage