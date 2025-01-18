import { IoMdPerson } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom"

function AccountNav() {

    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
        subpage = "profile";
    }

    function linkClasses(type) {

        let classes = ' inline-flex items-center gap-2 py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-black font-medium rounded-full';
        } else {
            classes += ' text-gray-600 bg-gray-200 rounded-full';
        }
        return classes;
    }

    return (
        <nav className="w-full hidden md:flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}>
                <IoMdPerson />
                My Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <IoListSharp />
                My Bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <RiHotelLine />
                My Accommodations
            </Link>
        </nav>
    )
}


export default AccountNav