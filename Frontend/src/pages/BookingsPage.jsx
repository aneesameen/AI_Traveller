import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from "axios"
import { BASE_URL } from "../Constants";
import { differenceInCalendarDays, format } from "date-fns";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { ImSad } from "react-icons/im";

function BookingsPage() {

    const [bookings, setBookings] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/bookings").then((response => {
            setBookings(response.data)
            setLoading(false);
        }))
    }, [bookings])


    if (!bookings.length > 0 && !loading) {
        return (
            < div >
                <AccountNav />
                <div className="text-2xl font-semibold items-center justify-center flex flex-col gap-5 mt-20">
                    No Bookings yet !
                    <ImSad className="text-5xl" />
                </div>
            </div >
        )
    }

    return (
        <div>
            <AccountNav />

            {loading ? (
                <div>
                    <LoadingScreen />
                </div>
            ) : (
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 gap-3">
                    {bookings?.length > 0 &&
                        bookings.map((booking) => (
                            <Link to={`/account/bookings/${booking?._id}`} className="md:flex gap-4 bg-gray-200 rounded-2xl overflow-hidden" key={booking?._id}>
                                <div className="flex w-full h-48 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-300 rounded-2xl shrink-0 overflow-hidden">
                                    {booking?.place?.photos.length > 0 && (
                                        <img
                                            className="object-cover w-full h-full"
                                            // src={`${BASE_URL}uploads/${booking?.place?.photos[0]}`}
                                            src={booking?.place?.photos[0]}
                                            onError={(e) => { e.target.src = "/hotel.png"; }}
                                            alt="image"
                                        />
                                    )}
                                </div>

                                <div className="py-3 px-3 grow">
                                    <h2 className="text-xl font-medium">{booking?.place?.title}</h2>
                                    <div className="text-sm text-gray-900 border-t border-gray-300 mt-2 py-2 flex items-center gap-2">
                                        <SlCalender />
                                        From: {format(new Date(booking.checkIn), "dd-mm-yyyy")} &rarr; To: {format(new Date(booking.checkOut), "dd-mm-yyyy")}
                                    </div>
                                    <div className="flex gap-10">
                                        <div className="text-md">
                                            For : {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Days <br />
                                            Price : ₹{booking?.price}
                                        </div>
                                        <div className="text-md capitalize">
                                            Resident: {booking?.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            )}
        </div>
    )
}
export default BookingsPage