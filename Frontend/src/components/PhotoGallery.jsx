import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";
import { MdOutlineGridView } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

function PhotoGallery({ singlePlace }) {
    const [showAllPics, setShowAllPics] = useState(false);

    useEffect(() => {
        if (showAllPics) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showAllPics]);


    if (showAllPics) {
        return (
            <div className="fixed inset-0 z-50 bg-white min-h-screen overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl md:text-3xl font-semibold">{singlePlace?.title}</h2>
                    <button
                        onClick={() => setShowAllPics(false)}
                        className="fixed right-10 z-10 text-black rounded-full p-2 hover:bg-gray-200 transition duration-300"
                    >
                        <IoIosCloseCircleOutline className="text-4xl" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {singlePlace?.photos?.map((pic, index) => (
                        <div key={index} className="w-full h-64 md:h-80 lg:h-96">
                            <img
                                className="w-full h-full object-cover rounded-md shadow-md"
                                src={`${BASE_URL}uploads/${pic}`}
                                alt={`Photo ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-[2fr_1fr] lg:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
                {singlePlace?.photos?.[0] && (
                    <div className="col-span-1 lg:col-span-2 row-span-2 h-[300px] lg:h-[400px]">
                        <img
                            onClick={() => setShowAllPics(true)}
                            className="w-full h-full object-cover rounded-l-2xl cursor-pointer"
                            src={`${BASE_URL}uploads/${singlePlace?.photos[0]}`}
                        />
                    </div>
                )}
                {singlePlace?.photos?.[1] && (
                    <div className="h-[150px] lg:h-[200px]">
                        <img
                            onClick={() => setShowAllPics(true)}
                            className="w-full h-full object-cover cursor-pointer"
                            src={`${BASE_URL}uploads/${singlePlace?.photos[1]}`}
                        />
                    </div>
                )}
                {singlePlace?.photos?.[2] && (
                    <div className="h-[150px] lg:h-[200px] -mt-2 pt-2">
                        <img
                            onClick={() => setShowAllPics(true)}
                            className="w-full h-full object-cover cursor-pointer"
                            src={`${BASE_URL}uploads/${singlePlace?.photos[2]}`}
                        />
                    </div>
                )}
            </div>
            <button
                onClick={() => setShowAllPics(true)}
                className="absolute bottom-4 right-4 flex items-center gap-2 py-2 px-4 bg-white text-gray-800 rounded-lg shadow hover:shadow-md transition-all"
            >
                <MdOutlineGridView />
                More Pics
            </button>
        </div>
    );
}

export default PhotoGallery;
