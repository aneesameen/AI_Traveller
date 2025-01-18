import { FaPeopleGroup } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { FaPeoplePulling } from "react-icons/fa6";
import { BsPersonArmsUp } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";

export const SelectTravelList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole traveller in exploration",
        icon: <BsPersonArmsUp />,
        people: "1"
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Adventure for two travellers",
        icon: <FaPeoplePulling />,
        people: "2 People"
    },
    {
        id: 3,
        title: "Family",
        desc: "An adventure loving fun group",
        icon: <MdFamilyRestroom />,
        people: "3 to 5 People"
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill seekers",
        icon: <FaPeopleGroup />,
        people: "more than 5"
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Thoughtfull journey with cost-conscious planning. ",
        icon: <FaMoneyBillWave />,
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Balanced trip with reasonable budget",
        icon: <GiReceiveMoney />,
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Limitless experience with no cost cencern",
        icon: <GiTakeMyMoney />,
    }
]

export const AI_PROMPT = 'Generate Travel plan for Location : {location}, for {totalDays} Days for {traveller} with {budget} budget, give me hotels option list with HotelName, Hotel address, Price , hotel image url, geo coordinates, rating, description and suggest me an array of itenarary list with placeName, place Details, Place image url, geo coordination, ticket pricing, time to travel each of the location for {totalDays} days with each day plan with best time to visit in json format'