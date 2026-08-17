import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Seats from "./pages/Seats";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";
import MyBookings from "./pages/MyBookings";
import Login from "./components/Login";


function Home() {
    return (
        <div className="container text-center mt-5">
            <h1>Welcome to MovieBook 🎬</h1>
            <p className="lead">
                Book your favorite movies easily.
            </p>
        </div>
    );
}

function Bookings() {
    return (
        <div className="container mt-5">
            <h2>My Bookings</h2>
        </div>
    );
}

export default function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/home" element={<Home />} />

                <Route path="/movies" element={<Movies />} />

                <Route path="/bookings" element={<Bookings />} />

                <Route path="/shows/:movieId" element={<Shows />} />

                <Route path="/seats/:showId" element={<Seats />} />

                <Route path="/booking-confirmation" element={<BookingConfirmation />} />

                <Route path="/my-bookings" element={<MyBookings />} />

            </Routes>

        </BrowserRouter>
    );
}