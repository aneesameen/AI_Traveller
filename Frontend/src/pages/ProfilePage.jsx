import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import ProfileCard from "../components/ProfileCard";
import { googleLogout } from "@react-oauth/google";


function ProfilePage() {

    const [redirect, setRedirect] = useState(null);
    const [confirmLogout, setConfirmLogout] = useState(null);
    const { ready, user, setUser, luser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }


    const logout = async () => {
        await axios.post("/logout");
        googleLogout();
        localStorage.removeItem('user');
        setRedirect('/');
        window.location.href = '/';
        setUser(null);
    }


    if (!ready) {
        return <LoadingScreen />;
    }

    if (ready && !user && !luser && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />

            <ProfileCard user={user} luser={luser} />

            {subpage === "profile" && (
                <div className="text-center max-w-sm mx-auto mt-10">
                    {/* logged in as {user?.name} ({user?.email}) */}
                    <br />
                    <button onClick={() => setConfirmLogout(true)} className="primary font-medium max-w-sm mt-2 hover:bg-red-400 transition duration-200">Logout</button>
                </div>
            )}
            {confirmLogout && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">LOGOUT</h2>
                        <p>Are you sure you want to Logout?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="mr-4 px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setConfirmLogout(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={logout}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}
export default ProfilePage