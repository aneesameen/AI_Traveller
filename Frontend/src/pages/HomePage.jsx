import { useContext } from 'react'
import { Button } from '../components/ui/button'
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext";

function HomePage() {

    const { user, luser } = useContext(UserContext)
    return (
        <div className='flex flex-col items-center mx-4 sm:mx-12 md:mx-20 lg:mx-56 mb-20 gap-9'>
            {/* <h1 className='font-extrabold text-[50px] text-center mt-16'><span className='text-[#f56554]'>Discover Your Next Adventure with AI:</span>Personalized Itineraries at Your Fingertips</h1> */}
            <h1 className='font-extrabold text-[32px] sm:text-[40px] md:text-[50px] text-center mt-16'>
                <span className='text-primary'>AI-Generated Itineraries Designed for Your Best Travel:</span> Embark on Your Dream Journey
            </h1>

            <p className='text-lg sm:text-xl text-gray-500 text-center'>
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-48 justify-center items-center">
                <Link to={'/main'}>
                    <Button>Book Your Stay</Button>
                </Link>
                {user || luser ? (
                    <Link to="/create-trip">
                        <Button>Create An Itinerary</Button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <Button>Create An Itinerary</Button>
                    </Link>
                )}
            </div>
        </div>

    )
}
export default HomePage