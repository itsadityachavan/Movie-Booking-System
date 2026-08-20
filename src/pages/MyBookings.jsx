import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);


    // =====================================================
    // LOAD BOOKINGS
    // =====================================================

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


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

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


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    background: "#f8fafc"
                }}
                className="d-flex justify-content-center align-items-center"
            >

                <div className="text-center">

                    <div
                        className="spinner-border"
                        style={{
                            color: "#dc2626",
                            width: "2.8rem",
                            height: "2.8rem"
                        }}
                        role="status"
                    >
                    </div>

                    <p
                        className="mt-3 mb-0"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Loading your bookings...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // NO BOOKINGS
    // =====================================================

    if (bookings.length === 0) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    background: "#f8fafc",
                    paddingTop: "70px"
                }}
            >

                <div className="container">

                    <div className="text-center">

                        <div
                            className="mx-auto d-flex justify-content-center align-items-center"
                            style={{
                                width: "85px",
                                height: "85px",
                                borderRadius: "50%",
                                background: "#fee2e2",
                                color: "#dc2626",
                                fontSize: "38px"
                            }}
                        >

                            <i className="bi bi-ticket-perforated"></i>

                        </div>


                        <h2
                            className="fw-bold mt-4"
                            style={{
                                color: "#1e293b"
                            }}
                        >
                            No Bookings Yet
                        </h2>


                        <p
                            className="mb-4"
                            style={{
                                color: "#64748b"
                            }}
                        >
                            You haven't booked any movie tickets yet.
                        </p>


                        <button
                            className="btn px-4 py-2 fw-semibold"
                            style={{
                                background: "#dc2626",
                                color: "white",
                                borderRadius: "8px",
                                border: "none"
                            }}
                            onClick={() => navigate("/movies")}
                        >

                            <i className="bi bi-film me-2"></i>

                            Browse Movies

                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                paddingTop: "45px",
                paddingBottom: "70px"
            }}
        >

            <div className="container">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="text-center mb-5">

                    <span
                        className="badge px-3 py-2 mb-3"
                        style={{
                            background: "#fee2e2",
                            color: "#dc2626",
                            fontSize: "12px",
                            letterSpacing: "1px",
                            borderRadius: "20px"
                        }}
                    >

                        YOUR TICKETS

                    </span>


                    <h1
                        className="fw-bold mb-2"
                        style={{
                            color: "#1e293b",
                            fontSize: "36px"
                        }}
                    >

                        🎟️ My Bookings

                    </h1>


                    <p
                        className="mb-0"
                        style={{
                            color: "#64748b"
                        }}
                    >

                        View and manage your movie tickets

                    </p>

                </div>


                {/* =================================================
                    BOOKINGS
                ================================================= */}

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-11">

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
                                    key={booking.bookingId}
                                    className="mb-4"
                                    style={{
                                        background: "white",
                                        borderRadius: "16px",
                                        border: "1px solid #e2e8f0",
                                        boxShadow:
                                            "0 4px 15px rgba(15,23,42,0.06)",
                                        overflow: "hidden"
                                    }}
                                >


                                    {/* =================================================
                                        BOOKING TOP BAR
                                    ================================================= */}

                                    <div
                                        className="px-4 py-3 d-flex justify-content-between align-items-center flex-wrap gap-2"
                                        style={{
                                            background: isConfirmed
                                                ? "#f8fafc"
                                                : "#fef2f2",
                                            borderBottom:
                                                "1px solid #e2e8f0"
                                        }}
                                    >

                                        <div>

                                            <small
                                                style={{
                                                    color: "#94a3b8",
                                                    fontSize: "11px",
                                                    letterSpacing: "0.8px"
                                                }}
                                            >
                                                BOOKING ID
                                            </small>

                                            <div
                                                className="fw-bold"
                                                style={{
                                                    color: "#334155"
                                                }}
                                            >

                                                #{booking.bookingId}

                                            </div>

                                        </div>


                                        <span
                                            className="px-3 py-2"
                                            style={{
                                                background: isConfirmed
                                                    ? "#dcfce7"
                                                    : "#fee2e2",
                                                color: isConfirmed
                                                    ? "#15803d"
                                                    : "#dc2626",
                                                borderRadius: "20px",
                                                fontSize: "13px",
                                                fontWeight: "600"
                                            }}
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


                                    {/* =================================================
                                        CARD CONTENT
                                    ================================================= */}

                                    <div className="p-4">


                                        {/* MOVIE */}

                                        <div className="mb-4">

                                            <h3
                                                className="fw-bold mb-1"
                                                style={{
                                                    color: "#1e293b"
                                                }}
                                            >

                                                🎬{" "}

                                                {booking.movie?.title ||
                                                    "Movie unavailable"}

                                            </h3>


                                            {booking.movie && (

                                                <div
                                                    style={{
                                                        color: "#64748b",
                                                        fontSize: "14px"
                                                    }}
                                                >

                                                    {booking.movie.language}

                                                    {" • "}

                                                    {booking.movie.genre}

                                                </div>

                                            )}

                                        </div>


                                        {/* =================================================
                                            DETAILS
                                        ================================================= */}

                                        <div className="row g-3">


                                            {/* Theatre */}

                                            <div className="col-md-6">

                                                <div
                                                    className="p-3 h-100"
                                                    style={{
                                                        background: "#f8fafc",
                                                        borderRadius: "10px",
                                                        border:
                                                            "1px solid #e2e8f0"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            color: "#94a3b8",
                                                            fontSize: "12px",
                                                            marginBottom: "5px"
                                                        }}
                                                    >

                                                        <i className="bi bi-building me-2"></i>

                                                        THEATRE

                                                    </div>


                                                    <div
                                                        className="fw-semibold"
                                                        style={{
                                                            color: "#334155"
                                                        }}
                                                    >

                                                        {booking.theatre?.name ||
                                                            "Unavailable"}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Location */}

                                            <div className="col-md-6">

                                                <div
                                                    className="p-3 h-100"
                                                    style={{
                                                        background: "#f8fafc",
                                                        borderRadius: "10px",
                                                        border:
                                                            "1px solid #e2e8f0"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            color: "#94a3b8",
                                                            fontSize: "12px",
                                                            marginBottom: "5px"
                                                        }}
                                                    >

                                                        <i className="bi bi-geo-alt me-2"></i>

                                                        LOCATION

                                                    </div>


                                                    <div
                                                        className="fw-semibold"
                                                        style={{
                                                            color: "#334155"
                                                        }}
                                                    >

                                                        {booking.theatre?.location ||
                                                            "Unavailable"}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Screen */}

                                            <div className="col-md-6">

                                                <div
                                                    className="p-3 h-100"
                                                    style={{
                                                        background: "#f8fafc",
                                                        borderRadius: "10px",
                                                        border:
                                                            "1px solid #e2e8f0"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            color: "#94a3b8",
                                                            fontSize: "12px",
                                                            marginBottom: "5px"
                                                        }}
                                                    >

                                                        <i className="bi bi-display me-2"></i>

                                                        SCREEN

                                                    </div>


                                                    <div
                                                        className="fw-semibold"
                                                        style={{
                                                            color: "#334155"
                                                        }}
                                                    >

                                                        {booking.screen?.screenName ||
                                                            "Unavailable"}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* SEATS */}

                                            <div className="col-md-6">

                                                <div
                                                    className="p-3 h-100"
                                                    style={{
                                                        background: "#f8fafc",
                                                        borderRadius: "10px",
                                                        border:
                                                            "1px solid #e2e8f0"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            color: "#94a3b8",
                                                            fontSize: "12px",
                                                            marginBottom: "8px"
                                                        }}
                                                    >

                                                        <i className="bi bi-grid-3x3-gap me-2"></i>

                                                        SEATS

                                                    </div>


                                                    {seatNames.length > 0 ? (

                                                        <div className="d-flex flex-wrap gap-2">

                                                            {seatNames.map(
                                                                (seatNumber) => (

                                                                    <span
                                                                        key={seatNumber}
                                                                        style={{
                                                                            background:
                                                                                "#eff6ff",
                                                                            color:
                                                                                "#2563eb",
                                                                            border:
                                                                                "1px solid #bfdbfe",
                                                                            padding:
                                                                                "5px 10px",
                                                                            borderRadius:
                                                                                "6px",
                                                                            fontSize:
                                                                                "13px",
                                                                            fontWeight:
                                                                                "600"
                                                                        }}
                                                                    >

                                                                        {seatNumber}

                                                                    </span>

                                                                )
                                                            )}

                                                        </div>

                                                    ) : (

                                                        <span
                                                            style={{
                                                                color: "#94a3b8"
                                                            }}
                                                        >
                                                            No seats available
                                                        </span>

                                                    )}

                                                </div>

                                            </div>


                                            {/* DATE */}

                                            <div className="col-md-6">

                                                <div
                                                    className="p-3"
                                                    style={{
                                                        background: "#f8fafc",
                                                        borderRadius: "10px",
                                                        border:
                                                            "1px solid #e2e8f0"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            color: "#94a3b8",
                                                            fontSize: "12px",
                                                            marginBottom: "5px"
                                                        }}
                                                    >

                                                        <i className="bi bi-calendar-event me-2"></i>

                                                        SHOW DATE

                                                    </div>


                                                    <div
                                                        className="fw-semibold"
                                                        style={{
                                                            color: "#334155"
                                                        }}
                                                    >

                                                        {booking.show?.showDate ||
                                                            "Unavailable"}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* TIME */}

                                            <div className="col-md-6">

                                                <div
                                                    className="p-3"
                                                    style={{
                                                        background: "#f8fafc",
                                                        borderRadius: "10px",
                                                        border:
                                                            "1px solid #e2e8f0"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            color: "#94a3b8",
                                                            fontSize: "12px",
                                                            marginBottom: "5px"
                                                        }}
                                                    >

                                                        <i className="bi bi-clock me-2"></i>

                                                        SHOW TIME

                                                    </div>


                                                    <div
                                                        className="fw-semibold"
                                                        style={{
                                                            color: "#334155"
                                                        }}
                                                    >

                                                        {booking.show?.showTime ||
                                                            "Unavailable"}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        {/* =================================================
                                            BOTTOM
                                        ================================================= */}

                                        <div
                                            className="mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
                                            style={{
                                                borderTop:
                                                    "1px solid #e2e8f0"
                                            }}
                                        >


                                            {/* TOTAL */}

                                            <div>

                                                <small
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    TOTAL AMOUNT
                                                </small>


                                                <div
                                                    className="fw-bold"
                                                    style={{
                                                        color: "#16a34a",
                                                        fontSize: "24px"
                                                    }}
                                                >

                                                    ₹{booking.totalAmount}

                                                </div>

                                            </div>


                                            {/* BOOKING DATE */}

                                            <div>

                                                <small
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    BOOKED ON
                                                </small>


                                                <div
                                                    className="fw-semibold"
                                                    style={{
                                                        color: "#334155",
                                                        fontSize: "14px"
                                                    }}
                                                >

                                                    {booking.bookingDate
                                                        ? new Date(
                                                            booking.bookingDate
                                                        ).toLocaleString()
                                                        : "Unavailable"}

                                                </div>

                                            </div>


                                            {/* BUTTONS */}

                                            <div
                                                className="d-flex gap-2 flex-wrap"
                                            >

                                                {/* VIEW */}

                                                <button
                                                    className="btn fw-semibold"
                                                    style={{
                                                        background:
                                                            "#2563eb",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "8px",
                                                        padding:
                                                            "9px 16px"
                                                    }}
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


                                                {/* CANCEL */}

                                                {isConfirmed && (

                                                    <button
                                                        className="btn fw-semibold"
                                                        style={{
                                                            background:
                                                                "white",
                                                            color:
                                                                "#dc2626",
                                                            border:
                                                                "1px solid #fecaca",
                                                            borderRadius:
                                                                "8px",
                                                            padding:
                                                                "9px 16px"
                                                        }}
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

        </div>

    );

}