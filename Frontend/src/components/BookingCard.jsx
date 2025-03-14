import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";
import { BASE_URL } from "../Constants";


function BookingCard({ singlePlace }) {

    const navigate = useNavigate();

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [redirect, setRedirect] = useState("");
    const [loading, setLoading] = useState(false);

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

        if (phoneNo.length !== 10) {
            toast.error("invalid phone no.")
            return;
        }

        setLoading(true);

        if (user || luser) {
            try {
                const totalAmount = totalNoOfDays * singlePlace?.price;

                const { data } = await axios.post("/create-order", { totalAmount });

                const options = {
                    key: "rzp_test_mWaBYCWHNbBLUr",
                    amount: data.amount,
                    currency: "INR",
                    name: "Traveller",
                    description: `Booking for ${singlePlace?.title}`,
                    order_id: data.id,
                    handler: async function (response) {
                        const verify = await axios.post("/verify-payment", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingDetails: {
                                checkIn,
                                checkOut,
                                noOfGuests,
                                name,
                                phoneNo,
                                place: singlePlace._id,
                                placeName: singlePlace?.title,
                                totalAmount,
                            },
                        });

                        if (verify.data.success) {
                            toast.success("Booking successful!");
                            navigate("/account/bookings/success");
                        } else {
                            toast.error("Payment verification failed!");
                        }
                    },
                    prefill: {
                        name: user?.name || name,
                        email: user?.email || "guest@example.com",
                        contact: phoneNo,
                    },
                    theme: { color: "#008080" },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();

            } catch (error) {
                console.error(error);
                toast.error("Error while processing payment. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("Please login first");
        }
    };


    // const bookPlace = async () => {

    //     if (!checkIn || !checkOut || !noOfGuests || !name || !phoneNo) {
    //         toast.error("Please fill in every detail");
    //         return;
    //     }

    //     setLoading(true);

    //     if (user || luser) {
    //         try {
    //             const totalAmount = totalNoOfDays * singlePlace?.price;

    //             const { data } = await axios.post("/create-checkout-session", {
    //                 checkIn,
    //                 checkOut,
    //                 noOfGuests,
    //                 name,
    //                 phoneNo,
    //                 place: singlePlace._id,
    //                 placeName: singlePlace?.title,
    //                 totalAmount,
    //             });

    //             window.location.href = data.url;
    //             setLoading(false);

    //         } catch (error) {
    //             console.error(error);
    //             toast.error("Error while processing payment. Please try again.");
    //             setLoading(false);
    //         }
    //     } else {
    //         toast.error("Please login first");
    //         setLoading(false);
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
                            min={new Date().toISOString().split('T')[0]}
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check-Out:</label>
                        <input type="date"
                            min={new Date().toISOString().split('T')[0]}
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
                            <label>Phone No:</label>
                            <input
                                className="outline-none border px-2 rounded-2xl ml-2 capitalize"
                                type="tel"
                                value={phoneNo}
                                placeholder="9797xxxxxx"
                                onChange={ev => {
                                    const input = ev.target.value.replace(/\D/g, '');
                                    if (input.length <= 10) {
                                        setPhoneNo(input);
                                    } else {
                                        toast.error("Invalid Phone No.")
                                    }
                                }}
                                maxLength={10}
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
            {loading ? (
                <button className="primary mt-4 flex justify-center gap-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </button>
            ) : (
                <button onClick={bookPlace} className="primary mt-4 flex justify-center gap-8">
                    Book Now
                    {totalNoOfDays > 0 && (
                        <>
                            <span> ₹{totalNoOfDays * singlePlace?.price}</span>
                        </>
                    )}
                </button>
            )}
        </div>
    )
}
export default BookingCard