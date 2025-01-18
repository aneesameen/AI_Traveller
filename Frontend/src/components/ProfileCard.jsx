import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProfileCard({ user, luser }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!user && !luser) {
            return;
        }
        axios.get("/profile").then(response => {
            const { data } = response;

            setName(data?.name);
            setEmail(data?.email);
        })
    }, [user || luser])


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (ev) => {
        ev.preventDefault();
        try {
            if (user || luser) {
                const id = user?._id
                axios.put("/user", {
                    id,
                    name, email, password
                })
                setIsEditing(false);
                location.reload()
            }
        } catch (error) {
            alert("cant edit the profile")
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
            <div className="space-y-4">
                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Username</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="username"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 mt-1 capitalize"
                        />
                    ) : (
                        <p className="text-lg font-medium capitalize">{user?.name || luser?.name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    {isEditing ? (
                        <input
                            readOnly
                            disabled
                            type="email"
                            name="email"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 mt-1 outline-none cursor-not-allowed"
                        />
                    ) : (
                        <p className="text-lg font-medium">{user?.email || luser?.email}</p>
                    )}
                </div>

                {/* Password */}
                {isEditing && !luser && (
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        {isEditing ? (
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm p-2 mt-1"
                            />
                        ) : (
                            <p className="text-lg font-medium">{user.password}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-6 gap-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 primary text-white rounded-lg shadow hover:bg-blue-600"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfileCard;
