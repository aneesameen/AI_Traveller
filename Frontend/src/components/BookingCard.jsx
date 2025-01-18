import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";
import { BASE_URL } from "../Constants";


function BookingCard({ singlePlace }) {

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [redirect, setRedirect] = useState("");

    const { user, luser } = useContext(UserContext);

    useEffect(() => {
        if (user || luser) {
            setName(user?.name || luser?.name)
        }
    }, [user])


    let totalNoOfDays = 0;
    if (checkIn && checkOut) {
        totalNoOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }



    const bookPlace = async () => {

        if (!checkIn || !checkOut || !noOfGuests || !name || !phoneNo) {
            toast.error("Please fill in every detail");
            return;
        }

        if (user || luser) {
            try {
                const totalAmount = totalNoOfDays * singlePlace?.price;

                const { data } = await axios.post("/create-checkout-session", {
                    checkIn,
                    checkOut,
                    noOfGuests,
                    name,
                    phoneNo,
                    place: singlePlace._id,
                    placeName: singlePlace?.title,
                    totalAmount,
                });

                window.location.href = data.url;

            } catch (error) {
                console.error(error);
                toast.error("Error while processing payment. Please try again.");
            }
        } else {
            toast.error("Please login first");
        }
    }


    // const reservePlace = async (ev) => {

    //     ev.preventDefault();

    //     if (!checkIn || !checkOut || !noOfGuests || !name || !phoneNo) {
    //         toast.error("please fill in every detail");
    //         return;
    //     }

    //     if (user || luser) {
    //         try {
    //             const response = await axios.post("/bookings", {
    //                 checkIn, checkOut, noOfGuests, name,
    //                 phoneNo, place: singlePlace._id,
    //                 price: totalNoOfDays * singlePlace?.price
    //             });
    //             const bookingId = response.data._id;
    //             setRedirect(`/account/bookings/${bookingId}`)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     } else {
    //         toast.error("Please login first")
    //     }
    // }

    if (redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-xl text-center">
                Price : ₹{singlePlace?.price}/night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex flex-col md:flex-row">
                    <div className="py-3 px-4">
                        <label>Check-In:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check-Out:</label>
                        <input type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Guests:</label>
                    <input className="outline-none border px-2 rounded-2xl ml-2"
                        min={1}
                        type="number"
                        value={noOfGuests}
                        onChange={ev => setNoOfGuests(ev.target.value)}
                    />
                </div>
                {totalNoOfDays > 0 && (
                    <div>
                        <div className="py-3 px-4 border-t">
                            <label>Full Name:</label>
                            <input className="outline-none border px-2 rounded-2xl ml-2 capitalize"
                                type="text"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                            />
                            <label>Phone:</label>
                            <input className="outline-none border px-2 rounded-2xl ml-2 capitalize"
                                type="tel"
                                value={phoneNo}
                                onChange={ev => setPhoneNo(ev.target.value)}
                            />
                        </div>
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg underline">₹{singlePlace?.price} x {totalNoOfDays} nights</h2>
                                <h2 className="text-lg">₹{totalNoOfDays * singlePlace?.price}</h2>
                            </div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg underline">Any service fees</h2>
                                <h2 className="text-lg">₹0</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={bookPlace} className="primary mt-4 flex justify-center gap-8">
                Book Now
                {totalNoOfDays > 0 && (
                    <>
                        <span> ₹{totalNoOfDays * singlePlace?.price}</span>
                    </>
                )}
            </button>
        </div>
    )
}
export default BookingCard