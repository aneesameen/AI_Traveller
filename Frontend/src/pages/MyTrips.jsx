import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { db } from "@/services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripCardItem from "../components/UserTripCardItem";
import { UserContext } from "../context/UserContext";
import { Button } from "../components/ui/button";
import LoadingScreen from "../components/LoadingScreen";


function MyTrips() {

    const navigation = useNavigate();
    const [userTrips, setuserTrips] = useState([]);

    const { user, luser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (user || luser) {
            GetUserTrips();
        }
    }, [user, luser])


    const GetUserTrips = async () => {
        if (!user && !luser) {
            navigation('/');
            return;
        }

        setLoading(true);

        const q = query(collection(db, 'AI_TRIPS'), where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        setuserTrips([]);

        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push(doc.data());
        });

        setuserTrips(trips);
        setLoading(false);
    };

    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <>
            {userTrips?.length > 0 ? (
                <div className="mt-16">
                    <h2 className="font-bold text-3xl">My TRIPS</h2>

                    <div className="mt-10 mb-[150px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                            <UserTripCardItem trip={trip} key={index} />
                        ))
                            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                                <div key={index} className="h-[180px] w-ful bg-slate-200 animate-pulse rounded-xl">
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className="text-center mt-16">
                    <h2 className="font-medium text-2xl">No Trips for you yet</h2>
                    <div className="mt-10">
                        <Link to={"/create-trip"}>
                            <Button>Create Now</Button>
                        </Link>
                    </div>
                </div>
            )}

        </>
    )
}
export default MyTrips