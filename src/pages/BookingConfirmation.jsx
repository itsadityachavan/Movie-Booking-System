import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingConfirmation() {

    const location = useLocation();
    const navigate = useNavigate();

    const { booking, selectedSeats } = location.state || {};

    const [show, setShow] = useState(null);
    const [movie, setMovie] = useState(null);
    const [screen, setScreen] = useState(null);
    const [theatre, setTheatre] = useState(null);

    useEffect(() => {

        if (booking) {

            // 1. Get show details
            axios.get(`http://localhost:8080/getshowById/${booking.showId}`)
                .then((response) => {

                    console.log("SHOW DATA:", response.data);

                    setShow(response.data);

                    // 2. Get movie details
                    axios.get(`http://localhost:8080/getmovieById/${response.data.movieId}`)
                        .then((movieResponse) => {

                            console.log("MOVIE DATA:", movieResponse.data);

                            setMovie(movieResponse.data);

                        })
                        .catch((error) => {

                            console.log("ERROR FETCHING MOVIE:", error);

                        });

                    // 3. Get screen details
                    axios.get(`http://localhost:8080/getscreenById/${response.data.screenId}`)
                        .then((screenResponse) => {

                            console.log("SCREEN DATA:", screenResponse.data);

                            setScreen(screenResponse.data);

                            // 4. Get theatre details
                            axios.get(`http://localhost:8080/gettheatreById/${screenResponse.data.theatreId}`)
                                .then((theatreResponse) => {

                                    console.log("THEATRE DATA:", theatreResponse.data);

                                    setTheatre(theatreResponse.data);

                                })
                                .catch((error) => {

                                    console.log("ERROR FETCHING THEATRE:", error);

                                });

                        })
                        .catch((error) => {

                            console.log("ERROR FETCHING SCREEN:", error);

                        });

                })
                .catch((error) => {

                    console.log("ERROR FETCHING SHOW:", error);

                });

        }

    }, [booking]);

    if (!booking) {

        return (
            <div className="container mt-5 text-center">

                <h3>No booking information found.</h3>

                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/movies")}
                >
                    Back to Movies
                </button>

            </div>
        );

    }

    return (

        <div className="container mt-5">

            <div
                className="card shadow mx-auto"
                style={{ maxWidth: "600px" }}
            >

                <div className="card-body p-4">

                    {/* Confirmation Header */}

                    <div className="text-center">

                        <div
                            className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center"
                            style={{
                                width: "60px",
                                height: "60px",
                                fontSize: "30px"
                            }}
                        >
                            ✓
                        </div>

                        <h2 className="mt-3">
                            Booking Confirmed!
                        </h2>

                        {/* Movie Information */}

                        {movie && (
                            <div className="mb-4">

                                <h4>
                                    {movie.title}
                                </h4>

                                <p className="text-muted mb-0">
                                    {movie.language} • {movie.genre}
                                </p>

                            </div>
                        )}

                        <p className="text-muted">
                            Your movie tickets have been booked successfully.
                        </p>

                    </div>

                    <hr />

                    {/* Theatre Information */}

                    {theatre && (
                        <>
                            <div className="row mb-2">

                                <div className="col-6">
                                    <strong>Theatre</strong>
                                </div>

                                <div className="col-6 text-end">
                                    {theatre.name}
                                </div>

                            </div>

                            <div className="row mb-2">

                                <div className="col-6">
                                    <strong>Location</strong>
                                </div>

                                <div className="col-6 text-end">
                                    {theatre.location}
                                </div>

                            </div>
                        </>
                    )}

                    {/* Screen Information */}

                    {screen && (
                        <div className="row mb-2">

                            <div className="col-6">
                                <strong>Screen</strong>
                            </div>

                            <div className="col-6 text-end">
                                {screen.screenName}
                            </div>

                        </div>
                    )}

                    {/* Booking ID */}

                    <div className="row mb-2">

                        <div className="col-6">
                            <strong>Booking ID</strong>
                        </div>

                        <div className="col-6 text-end">
                            #{booking.bookingId}
                        </div>

                    </div>

                    {/* Show ID */}

                    <div className="row mb-2">

                        <div className="col-6">
                            <strong>Show ID</strong>
                        </div>

                        <div className="col-6 text-end">
                            {booking.showId}
                        </div>

                    </div>

                    {/* Show Details */}

                    {show && (
                        <>
                            <div className="row mb-2">

                                <div className="col-6">
                                    <strong>Show Date</strong>
                                </div>

                                <div className="col-6 text-end">
                                    {show.showDate}
                                </div>

                            </div>

                            <div className="row mb-2">

                                <div className="col-6">
                                    <strong>Show Time</strong>
                                </div>

                                <div className="col-6 text-end">
                                    {show.showTime}
                                </div>

                            </div>
                        </>
                    )}

                    {/* Selected Seats */}

                    <div className="row mb-2">

                        <div className="col-6">
                            <strong>Seats</strong>
                        </div>

                        <div className="col-6 text-end">

                            {selectedSeats && selectedSeats.length > 0
                                ? selectedSeats.join(", ")
                                : "N/A"}

                        </div>

                    </div>

                    {/* Booking Date */}

                    <div className="row mb-2">

                        <div className="col-6">
                            <strong>Booking Date</strong>
                        </div>

                        <div className="col-6 text-end">
                            {new Date(
                                booking.bookingDate
                            ).toLocaleString()}
                        </div>

                    </div>

                    {/* Booking Status */}

                    <div className="row mb-2">

                        <div className="col-6">
                            <strong>Status</strong>
                        </div>

                        <div className="col-6 text-end text-success">

                            <strong>
                                {booking.bookingStatus}
                            </strong>

                        </div>

                    </div>

                    <hr />

                    {/* Total Amount */}

                    <div className="row">

                        <div className="col-6">
                            <h5>Total Amount</h5>
                        </div>

                        <div className="col-6 text-end">
                            <h5>₹{booking.totalAmount}</h5>
                        </div>

                    </div>

                    {/* Back to Movies */}

                    <button
                        className="btn btn-primary w-100 mt-4"
                        onClick={() => navigate("/movies")}
                    >
                        Back to Movies
                    </button>

                </div>

            </div>

        </div>

    );
}