import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Shows() {

    const { movieId } = useParams();
    const navigate = useNavigate();

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);


    // =====================================================
    // GET SHOWS
    // =====================================================

    useEffect(() => {

        console.log("MOVIE ID:", movieId);

        axios.get("http://localhost:8080/shows")

            .then((response) => {

                console.log("ALL SHOWS:", response.data);

                const movieShows = response.data.filter(
                    (show) =>
                        show.movieId === Number(movieId)
                );

                console.log(
                    "MOVIE SHOWS:",
                    movieShows
                );

                setShows(movieShows);
                setLoading(false);

            })

            .catch((error) => {

                console.log("ERROR:", error);

                setLoading(false);

            });

    }, [movieId]);


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
                        Loading available shows...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // PAGE
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
                    HEADER
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

                        SHOWTIMES

                    </span>


                    <h1
                        className="fw-bold mb-2"
                        style={{
                            color: "#1e293b",
                            fontSize: "36px"
                        }}
                    >

                        🎟️ Available Shows

                    </h1>


                    <p
                        className="mb-0"
                        style={{
                            color: "#64748b",
                            fontSize: "16px"
                        }}
                    >

                        Choose a date and showtime to continue booking

                    </p>

                </div>


                {/* =================================================
                    NO SHOWS
                ================================================= */}

                {shows.length === 0 ? (

                    <div
                        className="text-center mx-auto"
                        style={{
                            maxWidth: "550px",
                            padding: "50px 20px"
                        }}
                    >

                        <div
                            className="mx-auto mb-4 d-flex justify-content-center align-items-center"
                            style={{
                                width: "85px",
                                height: "85px",
                                borderRadius: "50%",
                                background: "#fee2e2",
                                color: "#dc2626",
                                fontSize: "38px"
                            }}
                        >

                            <i className="bi bi-film"></i>

                        </div>


                        <h3
                            className="fw-bold"
                            style={{
                                color: "#1e293b"
                            }}
                        >

                            No Shows Available

                        </h3>


                        <p
                            style={{
                                color: "#64748b"
                            }}
                        >

                            There are currently no shows available
                            for this movie.

                        </p>


                        <button
                            className="btn fw-semibold px-4 mt-2"
                            style={{
                                background: "#dc2626",
                                color: "white",
                                border: "none",
                                borderRadius: "8px"
                            }}
                            onClick={() => navigate("/movies")}
                        >

                            <i className="bi bi-arrow-left me-2"></i>

                            Back to Movies

                        </button>

                    </div>

                ) : (


                    /* =================================================
                       SHOW GRID
                    ================================================= */

                    <div className="row g-4">

                        {shows.map((show) => (

                            <div
                                className="col-xl-4 col-lg-4 col-md-6"
                                key={show.showId}
                            >

                                <div
                                    className="h-100"
                                    style={{
                                        background: "white",
                                        borderRadius: "16px",
                                        border:
                                            "1px solid #e2e8f0",
                                        boxShadow:
                                            "0 4px 15px rgba(15,23,42,0.06)",
                                        overflow: "hidden",
                                        transition:
                                            "transform 0.25s ease, box-shadow 0.25s ease"
                                    }}

                                    onMouseEnter={(e) => {

                                        e.currentTarget.style.transform =
                                            "translateY(-6px)";

                                        e.currentTarget.style.boxShadow =
                                            "0 12px 28px rgba(15,23,42,0.12)";

                                    }}

                                    onMouseLeave={(e) => {

                                        e.currentTarget.style.transform =
                                            "translateY(0)";

                                        e.currentTarget.style.boxShadow =
                                            "0 4px 15px rgba(15,23,42,0.06)";

                                    }}
                                >


                                    {/* =================================================
                                        CARD TOP
                                    ================================================= */}

                                    <div
                                        className="px-4 py-3 d-flex justify-content-between align-items-center"
                                        style={{
                                            background: "#fff",
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

                                                SHOW

                                            </small>


                                            <div
                                                className="fw-bold"
                                                style={{
                                                    color: "#334155"
                                                }}
                                            >

                                                #{show.showId}

                                            </div>

                                        </div>


                                        <span
                                            style={{
                                                background: "#dcfce7",
                                                color: "#15803d",
                                                padding: "6px 11px",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                fontWeight: "600"
                                            }}
                                        >

                                            <i className="bi bi-check-circle me-1"></i>

                                            Available

                                        </span>

                                    </div>


                                    {/* =================================================
                                        CARD BODY
                                    ================================================= */}

                                    <div className="p-4">


                                        {/* DATE */}

                                        <div
                                            className="d-flex align-items-center mb-4"
                                        >

                                            <div
                                                className="d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "10px",
                                                    background: "#eff6ff",
                                                    color: "#2563eb",
                                                    fontSize: "21px"
                                                }}
                                            >

                                                <i className="bi bi-calendar-event"></i>

                                            </div>


                                            <div>

                                                <small
                                                    className="d-block"
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: "12px"
                                                    }}
                                                >

                                                    SHOW DATE

                                                </small>


                                                <strong
                                                    style={{
                                                        color: "#334155"
                                                    }}
                                                >

                                                    {show.showDate}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* TIME */}

                                        <div
                                            className="d-flex align-items-center mb-4"
                                        >

                                            <div
                                                className="d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "10px",
                                                    background: "#fef3c7",
                                                    color: "#d97706",
                                                    fontSize: "21px"
                                                }}
                                            >

                                                <i className="bi bi-clock"></i>

                                            </div>


                                            <div>

                                                <small
                                                    className="d-block"
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: "12px"
                                                    }}
                                                >

                                                    SHOW TIME

                                                </small>


                                                <strong
                                                    style={{
                                                        color: "#334155",
                                                        fontSize: "18px"
                                                    }}
                                                >

                                                    {show.showTime}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* PRICE */}

                                        <div
                                            className="d-flex align-items-center mb-4"
                                        >

                                            <div
                                                className="d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "10px",
                                                    background: "#ecfdf5",
                                                    color: "#16a34a",
                                                    fontSize: "21px"
                                                }}
                                            >

                                                <i className="bi bi-ticket-perforated"></i>

                                            </div>


                                            <div>

                                                <small
                                                    className="d-block"
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: "12px"
                                                    }}
                                                >

                                                    STARTING FROM

                                                </small>


                                                <strong
                                                    style={{
                                                        color: "#16a34a",
                                                        fontSize: "20px"
                                                    }}
                                                >

                                                    ₹{show.ticketPrice}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* DIVIDER */}

                                        <hr
                                            style={{
                                                borderColor: "#e2e8f0"
                                            }}
                                        />


                                        {/* SELECT SEATS */}

                                        <button
                                            className="btn w-100 fw-semibold py-2"
                                            style={{
                                                background: "#dc2626",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px"
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/seats/${show.showId}`
                                                )
                                            }
                                        >

                                            <i className="bi bi-grid-3x3-gap-fill me-2"></i>

                                            Select Seats

                                            <i className="bi bi-arrow-right ms-2"></i>

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* =================================================
                    BACK TO MOVIES
                ================================================= */}

                {shows.length > 0 && (

                    <div className="text-center mt-5">

                        <button
                            className="btn fw-semibold"
                            style={{
                                background: "white",
                                color: "#475569",
                                border:
                                    "1px solid #cbd5e1",
                                borderRadius: "8px",
                                padding: "9px 18px"
                            }}
                            onClick={() => navigate("/movies")}
                        >

                            <i className="bi bi-arrow-left me-2"></i>

                            Back to Movies

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}