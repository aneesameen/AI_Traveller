import { useContext, useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../constants/options';
import { toast } from 'sonner';
import { UserContext } from '../context/UserContext';
import { chatSession } from '../services/AIModal';
import { VscLoading } from "react-icons/vsc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { IoAirplaneSharp } from "react-icons/io5";
import { GiPalmTree } from "react-icons/gi";

function CreateTrip() {

    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false)

    const { user, luser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }


    useEffect(() => {
    }, [formData])




    const generateTrip = async () => {

        if (!user && !luser) {
            toast.error("Please login first");
            setOpenBox(true);
            return;
        }




        if (!formData?.noOfDays || !formData?.budget || !formData?.location || !formData?.traveller) {
            toast.error("please fill everything");
            return;
        } else if (formData?.noOfDays <= 0) {
            toast.error("please enter valid trip days");
            return;
        } else if (formData?.noOfDays > 8) {
            toast.error("please enter trip days less than 8");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveller}', formData?.traveller)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);
        SaveAiTrip(result?.response?.text())
    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        // const Luser = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString()
        await setDoc(doc(db, "AI_TRIPS", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: luser?.email || user?.email,
            id: docId
        });
        setLoading(false);

        navigate('/view-trip/' + docId);

    }

    // sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-16 mb-16

    return (
        <div className='mt-16'>
            {/* <h2 className='font-bold text-3xl'>Provide your travel preferences 🏕️🌴</h2> */}
            <div className='font-bold text-3xl flex items-center gap-5'>
                <h2>Provide your travel preferences
                </h2>
                <IoAirplaneSharp />
                <GiPalmTree />
            </div>
            <p className='mt-3 text-gray-500 text-xl'>Provide a few details, and our trip planner will create a personalized itinerary just for you!

            </p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v);
                            }
                        }}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input placeholder={'Ex.3'} type="number"
                        onChange={
                            (e) => handleInputChange("noOfDays", e.target.value)
                        }
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange("budget", item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-md hover:shadow-primary ${formData?.budget == item.title && 'shadow-lg shadow-primary border-primary text-primary'}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                        {SelectTravelList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange("traveller", item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-md hover:shadow-primary ${formData?.traveller == item.people && 'shadow-lg shadow-primary border-primary text-primary'}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr className='mt-10' />
            <div className='my-10 flex justify-center'>
                <Button onClick={generateTrip}>
                    {loading ?
                        <VscLoading className='h-7 w-7 animate-spin' /> : "Generate plan"
                    }
                </Button>
            </div>


        </div>
    )
}
export default CreateTrip