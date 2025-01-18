// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } = require("@google/generative-ai");
import { HarmCategory, HarmBlockThreshold, GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel plan for Location : las vegas, for 3 Days for couple with a cheap budget, Give me a hotels option list with HotelName, Hotel address, Price , hotel image url, geo coordinates, rating, description and suggest me an itenarary listwith placeName, placeDetails, Place image url, geo coordintion, ticket pricing, time to travel each of the location for 3 days with each day plan with best time to visit in json format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "{\"hotels\":[{\"hotelName\":\"TheSTRATHotel,Casino&Tower\",\"address\":\"2000SLasVegasBlvd,LasVegas,NV89104\",\"price\":\"$39pernight\",\"rating\":\"7.2/10\",\"amenities\":[\"Rooftoppool\",\"Casino\",\"Restaurant\"],\"imageURL\":\"https://www.example.com/strat-image\",\"geoCoordinates\":{\"latitude\":36.1472,\"longitude\":-115.1564},\"description\":\"AffordablehotelwithacentrallocationneartheStripanda1,149-footobservationtower.\"},{\"hotelName\":\"CircusCircusHotel,Casino&ThemePark\",\"address\":\"2880SLasVegasBlvd,LasVegas,NV89109\",\"price\":\"$30pernight\",\"rating\":\"6.9/10\",\"amenities\":[\"Indoorthemepark\",\"Casino\",\"Pools\"],\"imageURL\":\"https://www.example.com/circus-image\",\"geoCoordinates\":{\"latitude\":36.1360,\"longitude\":-115.1626},\"description\":\"Family-friendlyhotelofferingbudgetaccommodationswithaccesstoentertainment.\"},{\"hotelName\":\"HorseshoeLasVegas\",\"address\":\"3645SLasVegasBlvd,LasVegas,NV89109\",\"price\":\"$45pernight\",\"rating\":\"8.0/10\",\"amenities\":[\"Casino\",\"Restaurants\",\"Centrallocation\"],\"imageURL\":\"https://www.example.com/horseshoe-image\",\"geoCoordinates\":{\"latitude\":36.1162,\"longitude\":-115.1744},\"description\":\"CentrallylocatedontheStripwithaffordableroomoptionsandabustlingcasino.\"}],\"itinerary\":[{\"day\":1,\"activities\":[{\"placeName\":\"BellagioConservatory&BotanicalGardens\",\"details\":\"Indoorgardenswithseasonaldisplaysofplantsandflowers.\",\"imageURL\":\"https://www.example.com/bellagio-image\",\"geoCoordinates\":{\"latitude\":36.1126,\"longitude\":-115.1762},\"ticketPricing\":\"Free\",\"bestTimeToVisit\":\"9:00AM\"},{\"placeName\":\"TheLINQPromenade\",\"details\":\"OutdoorshoppingandentertainmentdistrictfeaturingtheHighRollerFerriswheel.\",\"imageURL\":\"https://www.example.com/linq-image\",\"geoCoordinates\":{\"latitude\":36.1169,\"longitude\":-115.1719},\"ticketPricing\":\"$23(HighRollerdaytimeride)\",\"bestTimeToVisit\":\"2:00PM\"},{\"placeName\":\"FremontStreetExperience\",\"details\":\"DowntownLasVegasentertainmentdistrictwithlightshowsandstreetperformers.\",\"imageURL\":\"https://www.example.com/fremont-image\",\"geoCoordinates\":{\"latitude\":36.1715,\"longitude\":-115.1446},\"ticketPricing\":\"Free\",\"bestTimeToVisit\":\"7:00PM\"}]},{\"day\":2,\"activities\":[{\"placeName\":\"RedRockCanyonNationalConservationArea\",\"details\":\"Naturalconservationareawithscenicviewsandhikingtrails.\",\"imageURL\":\"https://www.example.com/redrock-image\",\"geoCoordinates\":{\"latitude\":36.1358,\"longitude\":-115.4282},\"ticketPricing\":\"$15pervehicle\",\"bestTimeToVisit\":\"8:00AM\"},{\"placeName\":\"TheVenetianGrandCanalShoppes\",\"details\":\"IndoorshoppingmallfeaturinggondolaridesandItalianarchitecture.\",\"imageURL\":\"https://www.example.com/venetian-image\",\"geoCoordinates\":{\"latitude\":36.1212,\"longitude\":-115.1692},\"ticketPricing\":\"$34(gondolaride)\",\"bestTimeToVisit\":\"1:00PM\"},{\"placeName\":\"BellagioFountainShow\",\"details\":\"Iconicfountainshowchoreographedtomusic.\",\"imageURL\":\"https://www.example.com/fountain-image\",\"geoCoordinates\":{\"latitude\":36.1124,\"longitude\":-115.1767},\"ticketPricing\":\"Free\",\"bestTimeToVisit\":\"8:00PM\"}]},{\"day\":3,\"activities\":[{\"placeName\":\"TheMobMuseum\",\"details\":\"MuseumshowcasingthehistoryoforganizedcrimeintheU.S.\",\"imageURL\":\"https://www.example.com/mobmuseum-image\",\"geoCoordinates\":{\"latitude\":36.1712,\"longitude\":-115.1415},\"ticketPricing\":\"$29.95\",\"bestTimeToVisit\":\"10:00AM\"},{\"placeName\":\"TheSTRATSkyPod\",\"details\":\"ObservationdeckwithpanoramicviewsofLasVegas.\",\"imageURL\":\"https://www.example.com/strat-image\",\"geoCoordinates\":{\"latitude\":36.1472,\"longitude\":-115.1564},\"ticketPricing\":\"$20\",\"bestTimeToVisit\":\"2:00PM\"},{\"placeName\":\"ParisLasVegasEiffelTowerExperience\",\"details\":\"ObservationdeckmodeledaftertheEiffelTower.\",\"imageURL\":\"https://www.example.com/paris-image\",\"geoCoordinates\":{\"latitude\":36.1124,\"longitude\":-115.1739},\"ticketPricing\":\"$24.50\",\"bestTimeToVisit\":\"7:00PM\"}]}]}" },
            ],
        },
    ],
});