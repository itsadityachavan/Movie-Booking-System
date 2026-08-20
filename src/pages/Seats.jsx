import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Seats() {

    const { showId } = useParams();
    const navigate = useNavigate();

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = 1;


    // =====================================================
    // GET SEATS
    // =====================================================

    useEffect(() => {

        axios.get(`http://localhost:8080/availableSeats/${showId}`)

            .then((response) => {

                console.log("SEATS DATA:", response.data);

                setSeats(response.data);
                setLoading(false);

            })

            .catch((error) => {

                console.log("ERROR:", error);
                setLoading(false);

            });

    }, [showId]);


    // =====================================================
    // SEAT SELECTION
    // =====================================================

    const handleSeatClick = (seat) => {

        if (seat.status === "BOOKED") {
            return;
        }

        if (selectedSeats.includes(seat.seatId)) {

            setSelectedSeats(
                selectedSeats.filter(
                    (id) => id !== seat.seatId
                )
            );

        } else {

            setSelectedSeats([
                ...selectedSeats,
                seat.seatId
            ]);

        }

    };


    // =====================================================
    // TOTAL PRICE
    // =====================================================

    const totalPrice = seats

        .filter((seat) =>
            selectedSeats.includes(seat.seatId)
        )

        .reduce((total, seat) => {

            return total + seat.price;

        }, 0);


    // =====================================================
    // SELECTED SEAT NAMES
    // =====================================================

    const selectedSeatNames = seats

        .filter((seat) =>
            selectedSeats.includes(seat.seatId)
        )

        .map((seat) => seat.seatNumber);


    // =====================================================
    // BOOKING
    // =====================================================

    const handleBooking = () => {

        if (selectedSeats.length === 0) {

            alert("Please select at least one seat");

            return;

        }


        const bookingData = {

            userId: userId,

            showId: Number(showId),

            seatIds: selectedSeats

        };


        axios.post(
            "http://localhost:8080/bookTickets",
            bookingData
        )

            .then((response) => {

                console.log(
                    "BOOKING SUCCESS:",
                    response.data
                );

                const bookingData = response.data;


                alert("Booking successful!");


                // Refresh seats

                axios.get(
                    `http://localhost:8080/availableSeats/${showId}`
                )

                    .then((response) => {

                        setSeats(response.data);


                        navigate(
                            "/booking-confirmation",
                            {
                                state: {

                                    booking: bookingData,

                                    selectedSeats:
                                        selectedSeats

                                }
                            }
                        );


                        setSelectedSeats([]);

                    })

                    .catch((error) => {

                        console.log(
                            "ERROR REFRESHING SEATS:",
                            error
                        );

                    });

            })

            .catch((error) => {

                console.log(
                    "BOOKING ERROR:",
                    error
                );


                if (
                    error.response &&
                    error.response.status === 409
                ) {

                    alert(
                        "One or more selected seats are already booked."
                    );

                } else {

                    alert("Booking failed.");

                }

            });

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

                        Loading seats...

                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                paddingTop: "40px",
                paddingBottom: "70px"
            }}
        >

            <div className="container">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="text-center mb-4">

                    <span
                        className="badge px-3 py-2 mb-3"
                        style={{
                            background: "#fee2e2",
                            color: "#dc2626",
                            borderRadius: "20px",
                            fontSize: "11px",
                            letterSpacing: "1px"
                        }}
                    >

                        SELECT YOUR SEATS

                    </span>


                    <h1
                        className="fw-bold mb-2"
                        style={{
                            color: "#1e293b",
                            fontSize: "34px"
                        }}
                    >

                        🎟️ Choose Your Seats

                    </h1>


                    <p
                        className="mb-0"
                        style={{
                            color: "#64748b"
                        }}
                    >

                        Select your preferred seats and continue to booking

                    </p>

                </div>


                {/* =================================================
                    SCREEN
                ================================================= */}

                <div className="text-center mb-5">

                    <div
                        className="mx-auto"
                        style={{
                            maxWidth: "650px"
                        }}
                    >

                        <div
                            style={{
                                height: "8px",
                                background:
                                    "linear-gradient(90deg, transparent, #dc2626, transparent)",
                                borderRadius: "50%",
                                boxShadow:
                                    "0 5px 18px rgba(220,38,38,0.25)"
                            }}
                        ></div>


                        <div
                            className="mt-3 fw-semibold"
                            style={{
                                color: "#64748b",
                                fontSize: "12px",
                                letterSpacing: "2px"
                            }}
                        >

                            SCREEN

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="row justify-content-center">

                    <div className="col-xl-10">


                        <div
                            className="p-4 p-md-5"
                            style={{
                                background: "white",
                                borderRadius: "18px",
                                border:
                                    "1px solid #e2e8f0",
                                boxShadow:
                                    "0 5px 20px rgba(15,23,42,0.06)"
                            }}
                        >


                            {/* =================================================
                                LEGEND
                            ================================================= */}

                            <div
                                className="d-flex justify-content-center flex-wrap gap-3 gap-md-4 mb-5"
                            >


                                {/* Regular */}

                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        color: "#475569"
                                    }}
                                >

                                    <span
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            background: "#16a34a",
                                            borderRadius: "5px",
                                            marginRight: "8px"
                                        }}
                                    ></span>

                                    <small>
                                        Regular ₹150
                                    </small>

                                </div>


                                {/* Premium */}

                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        color: "#475569"
                                    }}
                                >

                                    <span
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            background: "#f59e0b",
                                            borderRadius: "5px",
                                            marginRight: "8px"
                                        }}
                                    ></span>

                                    <small>
                                        Premium ₹250
                                    </small>

                                </div>


                                {/* Selected */}

                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        color: "#475569"
                                    }}
                                >

                                    <span
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            background: "#2563eb",
                                            borderRadius: "5px",
                                            marginRight: "8px"
                                        }}
                                    ></span>

                                    <small>
                                        Selected
                                    </small>

                                </div>


                                {/* Booked */}

                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        color: "#475569"
                                    }}
                                >

                                    <span
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            background: "#dc2626",
                                            borderRadius: "5px",
                                            marginRight: "8px"
                                        }}
                                    ></span>

                                    <small>
                                        Booked
                                    </small>

                                </div>

                            </div>


                            {/* =================================================
                                SEAT AREA
                            ================================================= */}

                            <div
                                className="d-flex flex-wrap justify-content-center mx-auto"
                                style={{
                                    maxWidth: "850px",
                                    gap: "10px"
                                }}
                            >

                                {seats.map((seat) => {

                                    const isSelected =
                                        selectedSeats.includes(
                                            seat.seatId
                                        );

                                    const isBooked =
                                        seat.status === "BOOKED";


                                    let backgroundColor =
                                        "#16a34a";

                                    let borderColor =
                                        "#16a34a";

                                    let textColor =
                                        "white";


                                    if (isBooked) {

                                        backgroundColor =
                                            "#dc2626";

                                        borderColor =
                                            "#dc2626";

                                    } else if (isSelected) {

                                        backgroundColor =
                                            "#2563eb";

                                        borderColor =
                                            "#2563eb";

                                    } else if (
                                        seat.seatType === "PREMIUM"
                                    ) {

                                        backgroundColor =
                                            "#f59e0b";

                                        borderColor =
                                            "#f59e0b";

                                    }


                                    return (

                                        <button
                                            key={seat.seatId}
                                            onClick={() =>
                                                handleSeatClick(seat)
                                            }
                                            disabled={isBooked}
                                            title={`${seat.seatType} - ₹${seat.price}`}
                                            style={{
                                                width: "52px",
                                                height: "44px",
                                                borderRadius: "8px",
                                                border:
                                                    `1px solid ${borderColor}`,
                                                backgroundColor:
                                                    backgroundColor,
                                                color:
                                                    textColor,
                                                fontSize: "12px",
                                                fontWeight: "700",
                                                cursor:
                                                    isBooked
                                                        ? "not-allowed"
                                                        : "pointer",
                                                opacity:
                                                    isBooked
                                                        ? 0.75
                                                        : 1,
                                                transition:
                                                    "transform 0.15s ease, opacity 0.15s ease"
                                            }}
                                            onMouseEnter={(e) => {

                                                if (!isBooked) {

                                                    e.currentTarget.style.transform =
                                                        "scale(1.08)";

                                                }

                                            }}
                                            onMouseLeave={(e) => {

                                                e.currentTarget.style.transform =
                                                    "scale(1)";

                                            }}
                                        >

                                            {seat.seatNumber}

                                        </button>

                                    );

                                })}

                            </div>


                            {/* =================================================
                                SELECTED SEATS
                            ================================================= */}

                            <div
                                className="mt-5 p-4"
                                style={{
                                    background: "#f8fafc",
                                    borderRadius: "12px",
                                    border:
                                        "1px solid #e2e8f0"
                                }}
                            >

                                <div className="text-center">

                                    <small
                                        className="fw-semibold"
                                        style={{
                                            color: "#64748b",
                                            letterSpacing: "0.5px"
                                        }}
                                    >

                                        SELECTED SEATS

                                    </small>


                                    {selectedSeatNames.length === 0 ? (

                                        <p
                                            className="mb-0 mt-2"
                                            style={{
                                                color: "#94a3b8"
                                            }}
                                        >

                                            No seats selected yet

                                        </p>

                                    ) : (

                                        <div
                                            className="d-flex justify-content-center flex-wrap gap-2 mt-3"
                                        >

                                            {selectedSeatNames.map(
                                                (seatNumber) => (

                                                    <span
                                                        key={seatNumber}
                                                        style={{
                                                            background:
                                                                "#dbeafe",
                                                            color:
                                                                "#2563eb",
                                                            borderRadius:
                                                                "7px",
                                                            padding:
                                                                "7px 13px",
                                                            fontWeight:
                                                                "700",
                                                            fontSize:
                                                                "13px"
                                                        }}
                                                    >

                                                        {seatNumber}

                                                    </span>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* =================================================
                                BOOKING SUMMARY
                            ================================================= */}

                            <div
                                className="mt-4 p-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #fff7ed, #fff)",
                                    border:
                                        "1px solid #fed7aa",
                                    borderRadius: "12px"
                                }}
                            >

                                <div
                                    className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
                                >


                                    {/* Seats */}

                                    <div className="text-center text-md-start">

                                        <small
                                            className="d-block"
                                            style={{
                                                color: "#94a3b8"
                                            }}
                                        >

                                            SELECTED

                                        </small>


                                        <strong
                                            style={{
                                                color: "#334155",
                                                fontSize: "18px"
                                            }}
                                        >

                                            {selectedSeats.length}{" "}

                                            {selectedSeats.length === 1
                                                ? "Seat"
                                                : "Seats"}

                                        </strong>

                                    </div>


                                    {/* Divider */}

                                    <div
                                        className="d-none d-md-block"
                                        style={{
                                            height: "40px",
                                            width: "1px",
                                            background: "#e2e8f0"
                                        }}
                                    ></div>


                                    {/* Total */}

                                    <div className="text-center">

                                        <small
                                            className="d-block"
                                            style={{
                                                color: "#94a3b8"
                                            }}
                                        >

                                            TOTAL AMOUNT

                                        </small>


                                        <strong
                                            style={{
                                                color: "#16a34a",
                                                fontSize: "26px"
                                            }}
                                        >

                                            ₹{totalPrice}

                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                BOOK BUTTON
                            ================================================= */}

                            <div className="text-center mt-4">

                                <button
                                    className="btn px-5 py-3 fw-semibold"
                                    onClick={handleBooking}
                                    disabled={
                                        selectedSeats.length === 0
                                    }
                                    style={{
                                        background:
                                            selectedSeats.length === 0
                                                ? "#cbd5e1"
                                                : "#dc2626",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "9px",
                                        minWidth: "230px",
                                        boxShadow:
                                            selectedSeats.length === 0
                                                ? "none"
                                                : "0 6px 15px rgba(220,38,38,0.2)"
                                    }}
                                >

                                    <i className="bi bi-ticket-perforated me-2"></i>

                                    Proceed to Booking

                                    <i className="bi bi-arrow-right ms-2"></i>

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}