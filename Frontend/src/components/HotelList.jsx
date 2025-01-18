import { Link } from "react-router-dom"
import HotelCardItem from "./HotelCardItem"

function HotelList({ trip }) {
    return (
        <div className="my-16">
            <h2 className="font-bold text-xl mt-5"> Hotel Recommendations</h2>
            <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {trip?.tripData?.hotels?.map((item, index) => (
                    <HotelCardItem hotel={item} key={index} />
                ))}
            </div>
        </div>

    )
}
export default HotelList