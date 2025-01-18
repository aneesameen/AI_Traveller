import axios from 'axios';
import { BASE_URL } from '../Constants';

const URL = `${BASE_URL}api/places`;


////getting places
export const GetPlaceDetails = async (data) => {
    try {
        const response = await axios.post(URL, data);
        return response.data;
        // console.log(response.data)
    } catch (error) {
        console.error("Error fetching place details:", error);
        throw error;
    }
};


export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1080&maxWidthPx=1080&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY