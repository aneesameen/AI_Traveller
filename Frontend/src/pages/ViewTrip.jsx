import { useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { toast } from 'sonner';
import React, { useContext, useEffect, useState } from 'react';
import InfoSection from "../components/InfoSection";
import HotelList from "../components/HotelList";
import PlacesToVisit from "../components/PlacesToVisit";
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

function Viewtrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { user, luser } = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
        tripId && getTripData();
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, 'AI_TRIPS', tripId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            // console.log("Document:", docSnap.data());
            setTrip(docSnap.data())
        } else {
            // console.log("No such Document");
            toast.error("No such trip found");
        }
    }


    const deleteTrip = async () => {
        if (confirmDelete) {
            try {
                const docRef = doc(db, 'AI_TRIPS', tripId);
                await deleteDoc(docRef);
                toast.success("Trip deleted successfully!");
                navigate("/my-trips");
            } catch (error) {
                toast.error("Failed to delete the trip. Please try again.");
                console.error("Error deleting trip:", error);
            }
        }
    };


    return (
        <>
            {user || luser ? (
                <div className="mt-10">
                    {/* Information section */}

                    <InfoSection trip={trip} deleteTrip={deleteTrip} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />

                    {/* Recommended Hotels */}

                    <HotelList trip={trip} />

                    {/* Daily plan */}

                    <PlacesToVisit trip={trip} />
                </div>
            ) : (
                navigate("/login")
            )}


        </>
    )
}
export default Viewtrip