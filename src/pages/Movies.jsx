import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import threeIdiotsPoster from "../assets/posters/3-idiots.jpg";
import inceptionPoster from "../assets/posters/inception.jpg";
import avengersPoster from "../assets/posters/avengers-endgame.jpg";


export default function Movies() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);


    // -----------------------------------------
    // Local Poster Mapping
    // -----------------------------------------

    const posterMap = {
        "3 Idiots": threeIdiotsPoster,
        "Inception": inceptionPoster,
        "Avengers: Endgame": avengersPoster
    };


    // -----------------------------------------
    // Get Movies
    // -----------------------------------------

    useEffect(() => {

        axios.get("http://localhost:8080/movies")

            .then((response) => {

                console.log("MOVIES DATA:", response.data);

                setMovies(response.data);

                setLoading(false);

            })

            .catch((error) => {

                console.log("ERROR:", error);

                setLoading(false);

            });

    }, []);


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
                    Loading movies...
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // No Movies
    // -----------------------------------------

    if (movies.length === 0) {

        return (

            <div className="container mt-5 text-center">

                <h3>
                    No movies available
                </h3>

                <p className="text-muted">
                    Please check again later.
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // Movie Cards
    // -----------------------------------------

    return (

        <div className="container mt-5 mb-5">


            {/* Page Heading */}

            <div className="text-center mb-5">

                <h2 className="fw-bold">
                    🎬 Now Showing
                </h2>

                <p className="text-muted">
                    Choose a movie and book your seats
                </p>

            </div>


            {/* Movie Grid */}

            <div className="row g-4">

                {movies.map((movie) => (

                    <div
                        className="col-xl-4 col-lg-4 col-md-6"
                        key={movie.movieId}
                    >

                        <div
                            className="card h-100 border-0 shadow-sm overflow-hidden"
                            style={{
                                borderRadius: "15px",
                                transition:
                                    "transform 0.2s, box-shadow 0.2s"
                            }}

                            onMouseEnter={(e) => {

                                e.currentTarget.style.transform =
                                    "translateY(-6px)";

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


                            {/* Movie Poster */}

                            <img
                                src={posterMap[movie.title]}
                                className="card-img-top"
                                alt={movie.title}
                                style={{
                                    height: "420px",
                                    objectFit: "cover"
                                }}
                            />


                            {/* Card Body */}

                            <div className="card-body d-flex flex-column p-4">


                                {/* Movie Title */}

                                <h4 className="card-title fw-bold mb-2">

                                    {movie.title}

                                </h4>


                                {/* Genre + Language */}

                                <div className="mb-3">

                                    <span className="badge bg-primary me-2">

                                        {movie.genre}

                                    </span>

                                    <span className="badge bg-secondary">

                                        {movie.language}

                                    </span>

                                </div>


                                {/* Duration */}

                                <p className="text-muted mb-2">

                                    <i className="bi bi-clock me-2"></i>

                                    <strong>Duration:</strong>{" "}

                                    {movie.duration} mins

                                </p>


                                {/* Release Date */}

                                <p className="text-muted mb-3">

                                    <i className="bi bi-calendar3 me-2"></i>

                                    <strong>Release:</strong>{" "}

                                    {movie.releaseDate}

                                </p>


                                {/* Description */}

                                <p
                                    className="text-secondary mb-4"
                                    style={{
                                        lineHeight: "1.6"
                                    }}
                                >

                                    {movie.description}

                                </p>


                                {/* View Shows Button */}

                                <button
                                    className="btn btn-primary w-100 mt-auto fw-semibold"
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

        </div>

    );

}