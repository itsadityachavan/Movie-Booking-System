import { useEffect, useState } from "react";
import axios from "axios";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Seats from "./pages/Seats";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";
import MyBookings from "./pages/MyBookings";
import Login from "./components/Login";

// Movie posters
import threeIdiotsPoster from "./assets/posters/3-idiots.jpg";
import inceptionPoster from "./assets/posters/inception.jpg";
import avengersPoster from "./assets/posters/avengers-endgame.jpg";
import interstellarPoster from "./assets/posters/interstellar.jpg";
import kgfPoster from "./assets/posters/kgf-chapter-2.jpg";
import infinityWarPoster from "./assets/posters/avengers-infinity-war.jpg";


// =====================================================
// HOME PAGE
// =====================================================

function Home() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);


    // =================================================
    // Poster Mapping
    // =================================================

    const posterMap = {

        "3 Idiots": threeIdiotsPoster,

        "Inception": inceptionPoster,

        "Avengers: Endgame": avengersPoster,

        "Interstellar": interstellarPoster,

        "KGF: Chapter 2": kgfPoster,

        "Avengers: Infinity War": infinityWarPoster

    };


    // =================================================
    // Load Movies
    // =================================================

    useEffect(() => {

        axios
            .get("http://localhost:8080/movies")

            .then((response) => {

                console.log("HOME MOVIES:", response.data);

                setMovies(response.data.slice(0, 3));

                setLoadingMovies(false);

            })

            .catch((error) => {

                console.log("HOME MOVIES ERROR:", error);

                setLoadingMovies(false);

            });

    }, []);


    return (

        <div>

            {/* =================================================
                HERO SECTION
            ================================================= */}

            <section
                className="text-white d-flex align-items-center"
                style={{
                    minHeight: "80vh",

                    background:
                        "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.88)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80') center/cover"
                }}
            >

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-7">

                            <span className="badge bg-danger px-3 py-2 mb-3 fs-6">

                                🎬 Welcome to MovieBook

                            </span>


                            <h1
                                className="display-2 fw-bold mb-4"
                                style={{ lineHeight: "1.1" }}
                            >

                                Your Movie Night
                                <br />
                                Starts Here.

                            </h1>


                            <p
                                className="lead text-light mb-4"
                                style={{
                                    maxWidth: "600px",
                                    lineHeight: "1.7"
                                }}
                            >

                                Discover the latest movies, choose your
                                favorite seats and book your tickets in
                                just a few clicks.

                            </p>


                            <div className="d-flex gap-3 flex-wrap">

                                <button
                                    className="btn btn-danger btn-lg px-4 py-3 fw-semibold"
                                    onClick={() => navigate("/movies")}
                                >

                                    <i className="bi bi-ticket-perforated me-2"></i>

                                    Explore Movies

                                </button>


                                <button
                                    className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold"
                                    onClick={() => navigate("/my-bookings")}
                                >

                                    <i className="bi bi-bookmark-check me-2"></i>

                                    My Bookings

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                NOW SHOWING
            ================================================= */}

            <section className="py-5">

                <div className="container">


                    <div className="text-center mb-5">

                        <span className="text-danger fw-semibold">

                            NOW SHOWING

                        </span>


                        <h2 className="fw-bold mt-2">

                            🔥 Featured Movies

                        </h2>


                        <p className="text-muted">

                            Catch the latest movies currently available.

                        </p>

                    </div>


                    {/* Loading */}

                    {loadingMovies && (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-danger"
                                role="status"
                            >
                            </div>

                            <p className="text-muted mt-3">

                                Loading movies...

                            </p>

                        </div>

                    )}


                    {/* Movie Cards */}

                    {!loadingMovies && movies.length > 0 && (

                        <div className="row g-4">

                            {movies.map((movie) => (

                                <div
                                    className="col-lg-4 col-md-6"
                                    key={movie.movieId}
                                >

                                    <div
                                        className="card border-0 shadow-sm h-100 overflow-hidden"
                                        style={{
                                            borderRadius: "18px",
                                            transition:
                                                "transform 0.25s, box-shadow 0.25s"
                                        }}

                                        onMouseEnter={(e) => {

                                            e.currentTarget.style.transform =
                                                "translateY(-8px)";

                                            e.currentTarget.style.boxShadow =
                                                "0 15px 35px rgba(0,0,0,0.18)";

                                        }}

                                        onMouseLeave={(e) => {

                                            e.currentTarget.style.transform =
                                                "translateY(0)";

                                            e.currentTarget.style.boxShadow =
                                                "0 .125rem .25rem rgba(0,0,0,.075)";

                                        }}
                                    >


                                        {/* Poster */}

                                        <img
                                            src={posterMap[movie.title]}
                                            alt={movie.title}
                                            className="card-img-top"
                                            style={{
                                                height: "420px",
                                                objectFit: "cover"
                                            }}
                                        />


                                        {/* Card Body */}

                                        <div className="card-body p-4 d-flex flex-column">


                                            <h4 className="fw-bold mb-2">

                                                {movie.title}

                                            </h4>


                                            <div className="mb-3">

                                                <span className="badge bg-danger me-2">

                                                    {movie.genre}

                                                </span>


                                                <span className="badge bg-secondary">

                                                    {movie.language}

                                                </span>

                                            </div>


                                            <p className="text-muted">

                                                <i className="bi bi-clock me-2"></i>

                                                {movie.duration} mins

                                            </p>


                                            <p
                                                className="text-secondary"
                                                style={{
                                                    lineHeight: "1.6"
                                                }}
                                            >

                                                {movie.description}

                                            </p>


                                            <button
                                                className="btn btn-danger w-100 mt-auto fw-semibold"
                                                onClick={() =>
                                                    navigate(
                                                        `/shows/${movie.movieId}`
                                                    )
                                                }
                                            >

                                                <i className="bi bi-ticket-perforated me-2"></i>

                                                View Shows

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}


                    {/* View All Movies */}

                    {!loadingMovies && movies.length > 0 && (

                        <div className="text-center mt-5">

                            <button
                                className="btn btn-outline-danger btn-lg px-5 fw-semibold"
                                onClick={() => navigate("/movies")}
                            >

                                View All Movies

                                <i className="bi bi-arrow-right ms-2"></i>

                            </button>

                        </div>

                    )}

                </div>

            </section>


            {/* =================================================
                WHY MOVIEBOOK
            ================================================= */}

            <section className="py-5 bg-light">

                <div className="container">


                    <div className="text-center mb-5">

                        <span className="text-danger fw-semibold">

                            WHY MOVIEBOOK?

                        </span>


                        <h2 className="fw-bold mt-2">

                            Everything You Need for a Perfect Movie Night

                        </h2>


                        <p className="text-muted">

                            Simple, fast and convenient movie booking.

                        </p>

                    </div>


                    <div className="row g-4">


                        {/* Feature 1 */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <div
                                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "30px"
                                    }}
                                >

                                    <i className="bi bi-film"></i>

                                </div>


                                <h4 className="fw-bold">

                                    Latest Movies

                                </h4>


                                <p className="text-muted mb-0">

                                    Explore popular movies and find
                                    something perfect to watch.

                                </p>

                            </div>

                        </div>


                        {/* Feature 2 */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <div
                                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "30px"
                                    }}
                                >

                                    <i className="bi bi-grid-3x3-gap"></i>

                                </div>


                                <h4 className="fw-bold">

                                    Choose Your Seats

                                </h4>


                                <p className="text-muted mb-0">

                                    Pick your preferred seats and enjoy
                                    the movie exactly the way you want.

                                </p>

                            </div>

                        </div>


                        {/* Feature 3 */}

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <div
                                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "30px"
                                    }}
                                >

                                    <i className="bi bi-check-circle"></i>

                                </div>


                                <h4 className="fw-bold">

                                    Easy Booking

                                </h4>


                                <p className="text-muted mb-0">

                                    Book your tickets quickly and view
                                    all your bookings in one place.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                CTA
            ================================================= */}

            <section className="py-5">

                <div className="container">

                    <div
                        className="rounded-4 text-white text-center p-5"
                        style={{
                            background:
                                "linear-gradient(135deg, #111827, #dc2626)"
                        }}
                    >

                        <h2 className="fw-bold mb-3">

                            Ready for Your Next Movie?

                        </h2>


                        <p className="lead mb-4">

                            Grab your seats before they're gone.

                        </p>


                        <button
                            className="btn btn-light btn-lg px-5 fw-semibold"
                            onClick={() => navigate("/movies")}
                        >

                            Browse Movies

                            <i className="bi bi-arrow-right ms-2"></i>

                        </button>

                    </div>

                </div>

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="bg-dark text-white py-4">

                <div className="container text-center">

                    <h5 className="fw-bold mb-2">

                        🎬 MovieBook

                    </h5>


                    <p className="text-secondary mb-2">

                        Your simple and convenient movie booking experience.

                    </p>


                    <small className="text-secondary">

                        © 2026 MovieBook. All rights reserved.

                    </small>

                </div>

            </footer>

        </div>

    );

}


// =====================================================
// BOOKINGS PAGE
// =====================================================

function Bookings() {

    return (

        <div className="container mt-5">

            <h2>
                My Bookings
            </h2>

        </div>

    );

}


// =====================================================
// APP
// =====================================================

export default function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>


                {/* Login */}

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />


                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Home */}

                <Route
                    path="/home"
                    element={<Home />}
                />


                {/* Movies */}

                <Route
                    path="/movies"
                    element={<Movies />}
                />


                {/* Bookings */}

                <Route
                    path="/bookings"
                    element={<Bookings />}
                />


                {/* Shows */}

                <Route
                    path="/shows/:movieId"
                    element={<Shows />}
                />


                {/* Seats */}

                <Route
                    path="/seats/:showId"
                    element={<Seats />}
                />


                {/* Booking Confirmation */}

                <Route
                    path="/booking-confirmation"
                    element={<BookingConfirmation />}
                />


                {/* My Bookings */}

                <Route
                    path="/my-bookings"
                    element={<MyBookings />}
                />

            </Routes>

        </BrowserRouter>

    );

}