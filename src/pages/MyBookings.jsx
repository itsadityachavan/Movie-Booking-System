import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);


    // -----------------------------------------
    // Load Bookings
    // -----------------------------------------

    useEffect(() => {

        loadBookings();

    }, []);


    const loadBookings = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/bookings"
            );

            console.log("BOOKINGS DATA:", response.data);


            const bookingData = await Promise.all(

                response.data.map(async (booking) => {

                    try {

                        // Get Show
                        const showResponse = await axios.get(
                            `http://localhost:8080/getshowById/${booking.showId}`
                        );

                        const show = showResponse.data;


                        // Get Movie
                        const movieResponse = await axios.get(
                            `http://localhost:8080/getmovieById/${show.movieId}`
                        );

                        const movie = movieResponse.data;


                        // Get Screen
                        const screenResponse = await axios.get(
                            `http://localhost:8080/getscreenById/${show.screenId}`
                        );

                        const screen = screenResponse.data;


                        // Get Theatre
                        const theatreResponse = await axios.get(
                            `http://localhost:8080/gettheatreById/${screen.theatreId}`
                        );

                        const theatre = theatreResponse.data;


                        // Get Booking Seats
                        const bookingSeatsResponse = await axios.get(
                            `http://localhost:8080/bookingseats/${booking.bookingId}`
                        );

                        const bookingSeats =
                            bookingSeatsResponse.data;


                        // Get Seat Details
                        const completeBookingSeats =
                            await Promise.all(

                                bookingSeats.map(
                                    async (bookingSeat) => {

                                        try {

                                            const seatResponse =
                                                await axios.get(
                                                    `http://localhost:8080/getseatById/${bookingSeat.seatId}`
                                                );

                                            return {
                                                ...bookingSeat,
                                                seat: seatResponse.data
                                            };

                                        } catch (error) {

                                            console.log(
                                                `ERROR FETCHING SEAT ${bookingSeat.seatId}:`,
                                                error
                                            );

                                            return bookingSeat;
                                        }

                                    }
                                )

                            );


                        return {

                            ...booking,

                            show: show,

                            movie: movie,

                            screen: screen,

                            theatre: theatre,

                            bookingSeats:
                                completeBookingSeats

                        };

                    } catch (error) {

                        console.log(
                            `ERROR FETCHING DETAILS FOR BOOKING ${booking.bookingId}:`,
                            error
                        );

                        return booking;

                    }

                })

            );


            console.log(
                "COMPLETE BOOKING DATA:",
                bookingData
            );


            setBookings(bookingData);

        } catch (error) {

            console.error(
                "ERROR FETCHING BOOKINGS:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // -----------------------------------------
    // Cancel Booking
    // -----------------------------------------

    const handleCancelBooking = async (bookingId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }


        try {

            setCancellingId(bookingId);


            const response = await axios.delete(
                `http://localhost:8080/cancelbooking/${bookingId}`
            );


            console.log(
                "CANCEL RESPONSE:",
                response.data
            );


            setBookings((previousBookings) =>

                previousBookings.map((booking) =>

                    booking.bookingId === bookingId

                        ? {
                            ...booking,
                            bookingStatus: "CANCELLED",
                            bookingSeats: []
                        }

                        : booking

                )

            );


            alert("Booking cancelled successfully.");

        } catch (error) {

            console.error(
                "ERROR CANCELLING BOOKING:",
                error
            );


            if (error.response) {

                alert(
                    error.response.data
                );

            } else {

                alert(
                    "Unable to cancel booking."
                );

            }

        } finally {

            setCancellingId(null);

        }

    };


    // -----------------------------------------
    // Loading
    // -----------------------------------------

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

                <p className="mt-3 text-muted">
                    Loading your bookings...
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // No Bookings
    // -----------------------------------------

    if (bookings.length === 0) {

        return (

            <div className="container mt-5 text-center">

                <div
                    className="card border-0 shadow-sm p-5"
                    style={{
                        borderRadius: "18px"
                    }}
                >

                    <div
                        style={{
                            fontSize: "55px"
                        }}
                    >
                        🎟️
                    </div>

                    <h3 className="fw-bold mt-3">
                        No Bookings Yet
                    </h3>

                    <p className="text-muted">
                        You haven't booked any movie tickets yet.
                    </p>

                    <button
                        className="btn btn-primary px-4 mt-2"
                        onClick={() => navigate("/movies")}
                    >

                        <i className="bi bi-film me-2"></i>

                        Browse Movies

                    </button>

                </div>

            </div>

        );

    }


    // -----------------------------------------
    // My Bookings UI
    // -----------------------------------------

    return (

        <div className="container mt-5 mb-5">


            {/* Page Header */}

            <div className="text-center mb-5">

                <h2 className="fw-bold">
                    🎟️ My Bookings
                </h2>

                <p className="text-muted">
                    View and manage your movie tickets
                </p>

            </div>


            {/* Booking Cards */}

            <div className="row justify-content-center">

                <div className="col-lg-10">


                    {bookings.map((booking) => {

                        const isConfirmed =
                            booking.bookingStatus === "CONFIRMED";

                        const seatNames =
                            booking.bookingSeats?.length > 0

                                ? booking.bookingSeats
                                    .map(
                                        (bookingSeat) =>
                                            bookingSeat.seat?.seatNumber
                                    )
                                    .filter(Boolean)

                                : [];


                        return (

                            <div
                                className="card border-0 shadow-sm mb-4 overflow-hidden"
                                key={booking.bookingId}
                                style={{
                                    borderRadius: "18px"
                                }}
                            >


                                {/* Top Header */}

                                <div
                                    className={`px-4 py-3 ${
                                        isConfirmed
                                            ? "bg-primary"
                                            : "bg-secondary"
                                    } text-white`}
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <small className="opacity-75">
                                                Booking
                                            </small>

                                            <h5 className="mb-0 fw-bold">

                                                #{booking.bookingId}

                                            </h5>

                                        </div>


                                        <span
                                            className={`badge ${
                                                isConfirmed
                                                    ? "bg-success"
                                                    : "bg-danger"
                                            } px-3 py-2`}
                                        >

                                            <i
                                                className={`bi ${
                                                    isConfirmed
                                                        ? "bi-check-circle"
                                                        : "bi-x-circle"
                                                } me-1`}
                                            ></i>

                                            {booking.bookingStatus}

                                        </span>

                                    </div>

                                </div>


                                {/* Card Body */}

                                <div className="card-body p-4">


                                    {/* Movie */}

                                    <div className="mb-4">

                                        <h3 className="fw-bold mb-1">

                                            🎬 {booking.movie?.title ||
                                                "Movie unavailable"}

                                        </h3>

                                        {booking.movie && (

                                            <span className="text-muted">

                                                {booking.movie.language}
                                                {" • "}
                                                {booking.movie.genre}

                                            </span>

                                        )}

                                    </div>


                                    {/* Information Grid */}

                                    <div className="row g-3">


                                        {/* Theatre */}

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3 h-100">

                                                <small className="text-muted d-block mb-1">

                                                    <i className="bi bi-building me-2"></i>

                                                    Theatre

                                                </small>

                                                <strong>

                                                    {booking.theatre?.name ||
                                                        "Unavailable"}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* Location */}

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3 h-100">

                                                <small className="text-muted d-block mb-1">

                                                    <i className="bi bi-geo-alt me-2"></i>

                                                    Location

                                                </small>

                                                <strong>

                                                    {booking.theatre?.location ||
                                                        "Unavailable"}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* Screen */}

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3 h-100">

                                                <small className="text-muted d-block mb-1">

                                                    <i className="bi bi-display me-2"></i>

                                                    Screen

                                                </small>

                                                <strong>

                                                    {booking.screen?.screenName ||
                                                        "Unavailable"}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* Seats */}

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3 h-100">

                                                <small className="text-muted d-block mb-2">

                                                    <i className="bi bi-grid-3x3-gap me-2"></i>

                                                    Seats

                                                </small>


                                                {seatNames.length > 0 ? (

                                                    <div className="d-flex flex-wrap gap-2">

                                                        {seatNames.map(
                                                            (seatNumber) => (

                                                                <span
                                                                    key={seatNumber}
                                                                    className="badge bg-primary px-3 py-2"
                                                                >

                                                                    {seatNumber}

                                                                </span>

                                                            )
                                                        )}

                                                    </div>

                                                ) : (

                                                    <strong className="text-muted">

                                                        No seats available

                                                    </strong>

                                                )}

                                            </div>

                                        </div>


                                        {/* Date */}

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted d-block mb-1">

                                                    <i className="bi bi-calendar-event me-2"></i>

                                                    Show Date

                                                </small>

                                                <strong>

                                                    {booking.show?.showDate ||
                                                        "Unavailable"}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* Time */}

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted d-block mb-1">

                                                    <i className="bi bi-clock me-2"></i>

                                                    Show Time

                                                </small>

                                                <strong>

                                                    {booking.show?.showTime ||
                                                        "Unavailable"}

                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* Bottom Section */}

                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">


                                        {/* Amount */}

                                        <div>

                                            <small className="text-muted d-block">
                                                Total Amount
                                            </small>

                                            <h4 className="fw-bold text-success mb-0">

                                                ₹{booking.totalAmount}

                                            </h4>

                                        </div>


                                        {/* Booking Date */}

                                        <div>

                                            <small className="text-muted d-block">
                                                Booking Date
                                            </small>

                                            <strong>

                                                {booking.bookingDate
                                                    ? new Date(
                                                        booking.bookingDate
                                                    ).toLocaleString()
                                                    : "Unavailable"}

                                            </strong>

                                        </div>


                                        {/* Buttons */}

                                        <div className="d-flex gap-2">


                                            {/* View Booking */}

                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    navigate(
                                                        "/booking-confirmation",
                                                        {
                                                            state: {

                                                                booking:
                                                                    booking,

                                                                selectedSeats:
                                                                    seatNames

                                                            }
                                                        }
                                                    )
                                                }
                                            >

                                                <i className="bi bi-eye me-2"></i>

                                                View Booking

                                            </button>


                                            {/* Cancel */}

                                            {isConfirmed && (

                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleCancelBooking(
                                                            booking.bookingId
                                                        )
                                                    }
                                                    disabled={
                                                        cancellingId ===
                                                        booking.bookingId
                                                    }
                                                >

                                                    {cancellingId ===
                                                    booking.bookingId ? (

                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                            ></span>

                                                            Cancelling...
                                                        </>

                                                    ) : (

                                                        <>
                                                            <i className="bi bi-x-circle me-2"></i>

                                                            Cancel
                                                        </>

                                                    )}

                                                </button>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>

    );

}