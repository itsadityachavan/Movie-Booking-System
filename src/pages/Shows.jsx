import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Shows() {

    const { movieId } = useParams();
    const navigate = useNavigate();

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);


    // -----------------------------------------
    // Get Shows
    // -----------------------------------------

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
                    Loading shows...
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // Page
    // -----------------------------------------

    return (

        <div className="container mt-5 mb-5">


            {/* Page Heading */}

            <div className="text-center mb-5">

                <h2 className="fw-bold">
                    🎟️ Available Shows
                </h2>

                <p className="text-muted">
                    Select a showtime to continue booking
                </p>

            </div>


            {/* No Shows */}

            {shows.length === 0 ? (

                <div className="text-center py-5">

                    <div
                        className="mb-3"
                        style={{
                            fontSize: "50px"
                        }}
                    >
                        🎬
                    </div>

                    <h4 className="fw-bold">
                        No Shows Available
                    </h4>

                    <p className="text-muted">
                        There are currently no shows
                        available for this movie.
                    </p>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate("/movies")}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Movies
                    </button>

                </div>

            ) : (

                <div className="row g-4">

                    {shows.map((show) => (

                        <div
                            className="col-xl-4 col-lg-4 col-md-6"
                            key={show.showId}
                        >

                            <div
                                className="card h-100 border-0 shadow-sm"
                                style={{
                                    borderRadius: "15px",
                                    transition:
                                        "transform 0.2s, box-shadow 0.2s"
                                }}

                                onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 10px 25px rgba(0,0,0,0.15)";

                                }}

                                onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 .125rem .25rem rgba(0,0,0,.075)";

                                }}
                            >


                                {/* Card Header */}

                                <div
                                    className="card-header bg-primary text-white border-0"
                                    style={{
                                        borderRadius:
                                            "15px 15px 0 0"
                                    }}
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <span className="fw-semibold">

                                            <i className="bi bi-film me-2"></i>

                                            Show #{show.showId}

                                        </span>

                                        <span className="badge bg-light text-primary">

                                            Available

                                        </span>

                                    </div>

                                </div>


                                {/* Card Body */}

                                <div className="card-body p-4">


                                    {/* Date */}

                                    <div className="d-flex align-items-center mb-4">

                                        <div
                                            className="bg-light rounded p-3 me-3"
                                            style={{
                                                fontSize: "24px"
                                            }}
                                        >
                                            📅
                                        </div>

                                        <div>

                                            <small className="text-muted d-block">
                                                Show Date
                                            </small>

                                            <strong>
                                                {show.showDate}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* Time */}

                                    <div className="d-flex align-items-center mb-4">

                                        <div
                                            className="bg-light rounded p-3 me-3"
                                            style={{
                                                fontSize: "24px"
                                            }}
                                        >
                                            🕐
                                        </div>

                                        <div>

                                            <small className="text-muted d-block">
                                                Show Time
                                            </small>

                                            <strong>
                                                {show.showTime}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* Ticket Price */}

                                    <div className="d-flex align-items-center mb-4">

                                        <div
                                            className="bg-light rounded p-3 me-3"
                                            style={{
                                                fontSize: "24px"
                                            }}
                                        >
                                            🎟️
                                        </div>

                                        <div>

                                            <small className="text-muted d-block">
                                                Ticket Price starting from
                                            </small>

                                            <strong className="text-success">

                                                ₹{show.ticketPrice}

                                            </strong>

                                        </div>

                                    </div>


                                    {/* Select Seats Button */}

                                    <button
                                        className="btn btn-primary w-100 fw-semibold py-2"
                                        onClick={() =>
                                            navigate(
                                                `/seats/${show.showId}`
                                            )
                                        }
                                    >

                                        <i className="bi bi-grid-3x3-gap-fill me-2"></i>

                                        Select Seats

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* Back Button */}

            {shows.length > 0 && (

                <div className="text-center mt-5">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/movies")}
                    >

                        <i className="bi bi-arrow-left me-2"></i>

                        Back to Movies

                    </button>

                </div>

            )}

        </div>

    );

}