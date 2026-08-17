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


    // -----------------------------------------
    // Get Seats
    // -----------------------------------------

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


    // -----------------------------------------
    // Seat Selection
    // -----------------------------------------

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


    // -----------------------------------------
    // Calculate Total
    // -----------------------------------------

    const totalPrice = seats
        .filter((seat) =>
            selectedSeats.includes(seat.seatId)
        )
        .reduce((total, seat) => {

            return total + seat.price;

        }, 0);


    // -----------------------------------------
    // Get Selected Seat Names
    // -----------------------------------------

    const selectedSeatNames = seats
        .filter((seat) =>
            selectedSeats.includes(seat.seatId)
        )
        .map((seat) => seat.seatNumber);


    // -----------------------------------------
    // Booking
    // -----------------------------------------

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


                        // Go to confirmation page

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

                <p className="text-muted mt-3">
                    Loading seats...
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // UI
    // -----------------------------------------

    return (

        <div className="container mt-5 mb-5">


            {/* Page Heading */}

            <div className="text-center mb-4">

                <h2 className="fw-bold">
                    🎟️ Select Your Seats
                </h2>

                <p className="text-muted">
                    Choose your preferred seats
                </p>

            </div>


            {/* Screen */}

            <div className="text-center mb-5">

                <div
                    className="mx-auto text-white fw-bold py-2"
                    style={{
                        maxWidth: "600px",
                        background:
                            "linear-gradient(to right, #212529, #6c757d, #212529)",
                        borderRadius: "50% 50% 5px 5px",
                        boxShadow:
                            "0 8px 20px rgba(0,0,0,0.25)"
                    }}
                >

                    SCREEN

                </div>

                <small className="text-muted">
                    All eyes this way
                </small>

            </div>


            {/* Seat Layout */}

            <div className="row justify-content-center">

                <div className="col-lg-9">


                    <div
                        className="card border-0 shadow-sm p-4"
                        style={{
                            borderRadius: "18px"
                        }}
                    >


                        {/* Legend */}

                        <div className="d-flex justify-content-center flex-wrap gap-4 mb-4">

                            <div className="d-flex align-items-center">

                                <span
                                    className="rounded me-2"
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        backgroundColor: "#198754"
                                    }}
                                ></span>

                                <small>
                                    Regular ₹150
                                </small>

                            </div>


                            <div className="d-flex align-items-center">

                                <span
                                    className="rounded me-2"
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        backgroundColor: "#ffc107"
                                    }}
                                ></span>

                                <small>
                                    Premium ₹250
                                </small>

                            </div>


                            <div className="d-flex align-items-center">

                                <span
                                    className="rounded me-2"
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        backgroundColor: "#0d6efd"
                                    }}
                                ></span>

                                <small>
                                    Selected
                                </small>

                            </div>


                            <div className="d-flex align-items-center">

                                <span
                                    className="rounded me-2"
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        backgroundColor: "#dc3545"
                                    }}
                                ></span>

                                <small>
                                    Booked
                                </small>

                            </div>

                        </div>


                        {/* Seats */}

                        <div
                            className="d-flex flex-wrap justify-content-center gap-2"
                        >

                            {seats.map((seat) => {

                                const isSelected =
                                    selectedSeats.includes(
                                        seat.seatId
                                    );

                                const isBooked =
                                    seat.status === "BOOKED";

                                let buttonClass =
                                    "btn-success";


                                if (isBooked) {

                                    buttonClass =
                                        "btn-danger";

                                } else if (isSelected) {

                                    buttonClass =
                                        "btn-primary";

                                } else if (
                                    seat.seatType === "PREMIUM"
                                ) {

                                    buttonClass =
                                        "btn-warning";

                                }


                                return (

                                    <button
                                        key={seat.seatId}
                                        onClick={() =>
                                            handleSeatClick(seat)
                                        }
                                        disabled={isBooked}
                                        className={`btn ${buttonClass}`}
                                        title={`${seat.seatType} - ₹${seat.price}`}
                                        style={{
                                            width: "58px",
                                            height: "48px",
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            borderRadius: "8px"
                                        }}
                                    >

                                        {seat.seatNumber}

                                    </button>

                                );

                            })}

                        </div>


                        {/* Selected Seats */}

                        <div className="text-center mt-5">

                            <h6 className="text-muted mb-2">

                                Selected Seats

                            </h6>


                            {selectedSeatNames.length === 0 ? (

                                <span className="text-muted">
                                    No seats selected
                                </span>

                            ) : (

                                <div className="d-flex justify-content-center flex-wrap gap-2">

                                    {selectedSeatNames.map(
                                        (seatNumber) => (

                                            <span
                                                key={seatNumber}
                                                className="badge bg-primary fs-6 px-3 py-2"
                                            >

                                                {seatNumber}

                                            </span>

                                        )
                                    )}

                                </div>

                            )}

                        </div>


                        {/* Booking Summary */}

                        <div
                            className="mt-4 p-3 bg-light rounded"
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <span className="fw-semibold">

                                    {selectedSeats.length}{" "}

                                    {selectedSeats.length === 1
                                        ? "Seat"
                                        : "Seats"}

                                </span>


                                <span className="fw-bold fs-5">

                                    ₹{totalPrice}

                                </span>

                            </div>

                        </div>


                        {/* Booking Button */}

                        <div className="text-center mt-4">

                            <button
                                className="btn btn-success px-5 py-2 fw-semibold"
                                onClick={handleBooking}
                                disabled={
                                    selectedSeats.length === 0
                                }
                            >

                                <i className="bi bi-ticket-perforated me-2"></i>

                                Proceed to Booking

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}