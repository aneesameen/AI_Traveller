import PlaceCardItem from "./PlaceCardItem"


function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-lg">Places To Visit</h2>

            <div>
                {trip?.tripData?.itinerary.map((item, index) => (
                    <div key={index} className="mt-6">
                        <h2 className="font-medium text-lg">Day {item?.day}</h2>
                        <div className=" grid lg:grid-cols-2 gap-5">
                            {item?.activities?.map((place, index) => (
                                <div key={index} className="my-3">
                                    <h2 className="font-medium text-md text-primary">{place?.bestTimeToVisit}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PlacesToVisit