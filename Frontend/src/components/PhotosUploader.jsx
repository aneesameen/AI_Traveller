import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import { sanityClient } from "../../client";
import ErrorMessage from "../components/ErrorMessage";

function PhotosUploader({ addedPhotos, onChange }) {
    const [loading, setLoading] = useState(false);
    const [photoLink, setPhotoLink] = useState("");
    const [showError, setShowError] = useState(false);

    const handleCloseError = () => {
        setShowError(false);
        setPhotoLink("");
    }

    const addPhotoByLink = async (ev) => {
        ev.preventDefault();
        if (!photoLink.trim()) return;

        try {
            const newPhoto = { url: photoLink, _id: null };
            console.log(newPhoto)
            setLoading(true);
            onChange((prev) => [...prev, newPhoto]);
            setPhotoLink("");
            setLoading(false);
        } catch (error) {
            console.error("Error adding photo by link:", error);
            setShowError(true);
        }
    };

    const uploadImage = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;

        const validFiles = selectedFiles.filter((file) =>
            ["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)
        );

        if (validFiles.length === 0) {
            setShowError(true);
            return;
        }

        setLoading(true);
        Promise.all(
            validFiles.map(async (file) => {
                const timestamp = Date.now();
                const fileName = `photo${timestamp}-${file.name}`;

                try {
                    const document = await sanityClient.assets
                        .upload("image", file, { contentType: file.type, filename: fileName });
                    return ({
                        url: document.url,
                        _id: document._id,
                        assetId: document.assetId,
                    });
                } catch (error) {
                    console.error("Failed to upload image:", error);
                    return null;
                }
            })
        )
            .then((uploadedPhotos) => {
                const successfulPhotos = uploadedPhotos.filter((photo) => photo !== null);
                onChange((prev) => [...prev, ...successfulPhotos]);
            })
            .finally(() => setLoading(false));
    };

    const handleDeletePic = (ev, photo) => {
        ev.preventDefault();
        onChange(addedPhotos.filter((p) => p.url !== photo.url));
    };

    const frontPic = (ev, photo) => {
        ev.preventDefault();
        const updatedPhotos = [photo, ...addedPhotos.filter((p) => p.url !== photo.url)];
        onChange(updatedPhotos);
    };

    return (
        <>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Add using a link ...jpg"
                    value={photoLink}
                    onChange={(ev) => setPhotoLink(ev.target.value)}
                />
                <button
                    onClick={addPhotoByLink}
                    className="bg-blue-400 px-4 rounded-2xl hover:bg-primary"
                >
                    Add&nbsp;picture
                </button>
            </div>

            <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-3">
                {addedPhotos.map((photo, index) => (
                    <div key={index} className="h-32 flex relative">
                        <img
                            className="rounded-2xl w-full object-cover"
                            src={photo.url}
                            alt={`Photo ${index + 1}`}
                            onError={(e) => { e.target.src = "/hotel.png"; }}
                        />
                        <button
                            onClick={(ev) => handleDeletePic(ev, photo)}
                            className="cursor-pointer absolute bottom-1 right-2 p-1 text-white hover:text-red-600 rounded-full bg-black bg-opacity-50"
                        >
                            <FaTrashAlt />
                        </button>
                        <button
                            onClick={(ev) => frontPic(ev, photo)}
                            className="cursor-pointer absolute bottom-1 left-2 p-1 text-white hover:text-primary rounded-full bg-black bg-opacity-50"
                        >
                            {photo === addedPhotos[0] ? (
                                <IoIosStar className="text-primary" />
                            ) : (
                                <IoIosStar />
                            )}
                        </button>
                    </div>
                ))}

                {showError && (
                    <ErrorMessage
                        message="Error uploading the photo. Please try again."
                        onClose={handleCloseError}
                    />
                )}
                {loading ? (
                    <label className="h-32 cursor-pointer flex flex-col items-center justify-center border bg-transparent rounded-2xl p-2 text-lg text-gray-900">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </label>
                ) : (
                    <label className="h-32 cursor-pointer flex flex-col items-center justify-center border bg-transparent rounded-2xl p-2 text-lg text-gray-900">
                        <input type="file" multiple className="hidden" onChange={uploadImage} />
                        <AiOutlineCloudUpload className="w-8 h-8" />
                        <h2 className="text-center">Upload from device</h2>
                    </label>
                )}
            </div>
        </>
    );
}

export default PhotosUploader;