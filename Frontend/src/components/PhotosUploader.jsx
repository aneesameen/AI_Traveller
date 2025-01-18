import { BASE_URL } from "../Constants";
import ErrorMessage from "../components/ErrorMessage";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import { useState } from "react";


function PhotosUploader({ addedPhotos, onChange }) {
    // const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");

    const [showError, setShowError] = useState(false);
    const handleCloseError = () => {
        setShowError(false);
        setPhotoLink('');
    };

    const addPhotoByLink = async (ev) => {
        ev.preventDefault();
        try {
            const { data: filename } = await axios.post("/upload-by-link", ({ link: photoLink }));
            onChange(prev => {
                return [...prev, filename];
            });
            setPhotoLink('')
        } catch (error) {
            if (error) {
                setShowError(true)
            }
        }
    }



    const uploadPhoto = async (ev) => {
        try {
            const files = ev.target.files;
            const data = new FormData();

            for (let i = 0; i < files.length; i++) {
                data.append("photos", files[i]);
            }

            const response = await axios.post("/upload", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { data: filenames } = response;
            onChange((prev) => [...prev, ...filenames]);
        } catch (error) {
            if (error) {
                setShowError(true)
            }
        }
    };


    // const uploadPhoto = (ev) => {
    //     const files = ev.target.files;
    //     const data = new FormData();
    //     for (let i = 0; i < files.length; i++) {
    //         data.append("photos", files[i]);
    //     }
    //     axios.post("/upload", data, {
    //         headers: { "Content-Type": "multipart/form-data" }
    //     }).then(response => {
    //         const { data: filenames } = response;
    //         onChange(prev => {
    //             return [...prev, ...filenames];
    //         });
    //     })
    // }

    const handleDeletePic = (ev, filename) => {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)])
    }

    const frontPic = (ev, filename) => {
        ev.preventDefault();
        const newselectedphoto = [filename, ...addedPhotos.filter(photo => photo !== filename)]
        onChange(newselectedphoto);
    }


    return (
        <>
            <div className="flex gap-2">
                <input type="text"
                    placeholder="Add using a link ...jpg"
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                />
                <button onClick={addPhotoByLink} className="bg-gary-600 px-4 rounded-2xl hover:bg-primary">Add&nbsp;picture</button>
            </div>

            <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-3">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex relative" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={`${BASE_URL}uploads/${link}`} alt="Image" />
                        <button onClick={ev => handleDeletePic(ev, link)} className="cursor-pointer absolute bottom-1 right-2 p-1 text-white hover:text-red-600 rounded-full bg-black bg-opacity-50">
                            <FaTrashAlt />
                        </button>
                        <button onClick={ev => frontPic(ev, link)} className="cursor-pointer absolute bottom-1 left-2 p-1 text-white hover:text-primary rounded-full bg-black bg-opacity-50">
                            {link === addedPhotos[0] && (
                                < IoIosStar className="text-primary" />
                            )}
                            {link !== addedPhotos[0] && (
                                <IoIosStar />
                            )}
                        </button>
                    </div>
                ))}
                {showError && (
                    <ErrorMessage
                        message="Couldn't upload the photo. Please try again"
                        onClose={handleCloseError}
                    />
                )}
                <label className="h-32 cursor-pointer flex flex-col items-center justify-center border bg-transparent rounded-2xl p-2 text-lg text-gray-900">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <AiOutlineCloudUpload className="w-8 h-8" />
                    Upload from device
                </label>
            </div>
        </>
    )
}
export default PhotosUploader