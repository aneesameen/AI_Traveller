import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { TiTick } from "react-icons/ti";

function Success() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("sessionId");
    const [bookingSaved, setBookingSaved] = useState(false);

    useEffect(() => {
        const saveBooking = async () => {
            try {
                await axios.post("/bookings", { sessionId });
                toast.success("Booking saved successfully!");
                setBookingSaved(true);
            } catch (error) {
                toast.error("Error while saving the booking.");
            }
        };

        if (sessionId && !bookingSaved) {
            saveBooking();
        }
    }, [sessionId, bookingSaved]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg shadow-primary p-8 text-center w-full sm:w-96">
                <div className="flex justify-center mb-6">
                    <TiTick className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Payment & Booking Successful</h2>
                <p className="text-gray-600 mb-6">Thank you for your payment! Your transaction has been processed successfully.</p>
                <a
                    href="/account/bookings"
                    className="bg-primary text-white px-6 py-2 rounded-lg"
                >
                    Go to your bookings
                </a>
            </div>
        </div>
    );
}

export default Success;
