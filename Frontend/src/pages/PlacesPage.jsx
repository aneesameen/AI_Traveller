import { Link, Navigate, useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import PlacesForm from "../components/PlacesForm";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";
import LoadingScreen from "../components/LoadingScreen";
import { ImSad } from "react-icons/im";

function PlacesPage() {
  const [places, setPlaces] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
      setLoading(false);
    });
  }, []);

  if (!places.length && !loading) {
    return (
      <div>
        <AccountNav />
        <div className="text-center mt-20">
          <Link
            className="inline-flex gap-2 items-center bg-primary text-white font-medium py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <FiPlus className="text-white" />
            Add your own Place
          </Link>
        </div>

        <div className="text-2xl text-center font-semibold items-center justify-center flex flex-col gap-5 mt-20">
          You did not add any accomodations yet !
          <ImSad className="text-5xl" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-20">
        <Link
          className="inline-flex gap-2 items-center bg-primary text-white font-medium py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <FiPlus className="text-white" />
          Add your own Place
        </Link>
      </div>

      {loading ? (
        <div>
          <LoadingScreen />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={`/account/places/${place._id}`}
                key={place._id}
                className="flex gap-5 bg-gray-300 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-in-out p-2"
              >
                <div className="w-36 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {place.photos.length > 0 && (
                    <img
                      src={place?.photos[0]}
                      alt="Place"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/hotel.png";
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col ">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {place?.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-4">
                    {place.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
export default PlacesPage;
