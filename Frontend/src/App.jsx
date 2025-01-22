import './App.css'
import { Route, Routes } from "react-router-dom";
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Layout from './components/Layout';
import Register from './pages/Register';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesForm from './components/PlacesForm';
import SinglePlacePage from './pages/SinglePlacePage';
import BookingsPage from './pages/BookingsPage';
import SingleBookingPage from './pages/SingleBookingPage';
import { SearchProvider } from './context/SearchContext';
import HomePage from './pages/HomePage';
import CreateTrip from './pages/CreateTrip';
import ViewTrip from './pages/ViewTrip';
import MyTrips from './pages/MyTrips';
import Success from './components/Success';


// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = 'https://ai-traveller-backend.onrender.com';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <SearchProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/main' element={<IndexPage />} />
            <Route path='/create-trip' element={<CreateTrip />} />
            <Route path='/view-trip/:tripId' element={<ViewTrip />} />
            <Route path='/my-trips' element={<MyTrips />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/account' element={<ProfilePage />} />
            <Route path='/account/places' element={<PlacesPage />} />
            <Route path='/account/bookings' element={<BookingsPage />} />
            <Route path='/account/bookings/:id' element={<SingleBookingPage />} />
            <Route path='/account/bookings/success' element={<Success />} />
            <Route path='/account/places/new' element={<PlacesForm />} />
            <Route path='/account/places/:id' element={<PlacesForm />} />
            <Route path='/place/:id' element={<SinglePlacePage />} />
          </Route>
        </Routes>
      </SearchProvider>
    </UserContextProvider>

  )
}

export default App
