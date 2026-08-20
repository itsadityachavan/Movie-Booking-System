import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import threeIdiotsPoster from "../assets/posters/3-idiots.jpg";
import inceptionPoster from "../assets/posters/inception.jpg";
import avengersPoster from "../assets/posters/avengers-endgame.jpg";

import interstellarPoster from "../assets/posters/interstellar.jpg";
import kgfPoster from "../assets/posters/kgf-chapter-2.jpg";
import infinityWarPoster from "../assets/posters/avengers-infinity-war.jpg";


export default function Movies() {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);


    // =====================================================
    // POSTER MAP
    // =====================================================

    const posterMap = {

        "3 Idiots": threeIdiotsPoster,

        "Inception": inceptionPoster,

        "Avengers: Endgame": avengersPoster,

        "Interstellar": interstellarPoster,

        "KGF: Chapter 2": kgfPoster,

        "Avengers: Infinity War": infinityWarPoster

    };


    // =====================================================
    // GET MOVIES
    // =====================================================

    useEffect(() => {

        axios
            .get("http://localhost:8080/movies")

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


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "70vh",
                    background:
                        "linear-gradient(135deg, #0f172a, #111827)"
                }}
            >

                <div className="text-center text-white">

                    <div
                        className="spinner-border"
                        style={{
                            color: "#ef4444",
                            width: "3rem",
                            height: "3rem"
                        }}
                        role="status"
                    >
                    </div>

                    <p className="mt-3 text-light">
                        Loading movies...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // NO MOVIES
    // =====================================================

    if (movies.length === 0) {

        return (

            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "70vh",
                    background:
                        "linear-gradient(135deg, #0f172a, #111827)"
                }}
            >

                <div className="text-center text-white">

                    <i
                        className="bi bi-film"
                        style={{
                            fontSize: "60px",
                            color: "#ef4444"
                        }}
                    ></i>

                    <h3 className="mt-3">
                        No Movies Available
                    </h3>

                    <p className="text-secondary">
                        Please check again later.
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // MOVIES PAGE
    // =====================================================

    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1f2937 100%)",
                paddingTop: "50px",
                paddingBottom: "70px"
            }}
        >

            <div className="container">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="text-center text-white mb-5">

                    <span
                        className="badge px-3 py-2 mb-3"
                        style={{
                            backgroundColor: "#dc2626",
                            fontSize: "14px",
                            letterSpacing: "1px"
                        }}
                    >

                        NOW SHOWING

                    </span>


                    <h1
                        className="fw-bold mb-3"
                        style={{
                            fontSize: "42px"
                        }}
                    >

                        🎬 Movies

                    </h1>


                    <p
                        className="text-light opacity-75"
                        style={{
                            fontSize: "17px"
                        }}
                    >

                        Choose your movie, pick your seats and enjoy the show.

                    </p>

                </div>


                {/* =================================================
                    MOVIE GRID
                ================================================= */}

                <div className="row g-4">

                    {movies.map((movie) => (

                        <div
                            className="col-xl-4 col-lg-4 col-md-6"
                            key={movie.movieId}
                        >

                            <div
                                className="h-100 overflow-hidden"
                                style={{
                                    background:
                                        "linear-gradient(145deg, #1e293b, #111827)",
                                    borderRadius: "20px",
                                    border:
                                        "1px solid rgba(255,255,255,0.08)",
                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.35)",
                                    transition:
                                        "transform 0.3s ease, box-shadow 0.3s ease"
                                }}

                                onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(-8px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 20px 40px rgba(0,0,0,0.5)";

                                }}

                                onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 10px 30px rgba(0,0,0,0.35)";

                                }}
                            >


                                {/* =================================================
                                    POSTER
                                ================================================= */}

                                <div
                                    style={{
                                        position: "relative",
                                        height: "360px",
                                        background: "#0b1120",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        overflow: "hidden"
                                    }}
                                >

                                    <img
                                        src={posterMap[movie.title]}
                                        alt={movie.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            display: "block"
                                        }}
                                    />


                                    {/* Bottom Gradient */}

                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: "90px",
                                            background:
                                                "linear-gradient(transparent, rgba(0,0,0,0.85))",
                                            pointerEvents: "none"
                                        }}
                                    ></div>


                                    {/* Rating */}

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "15px",
                                            right: "15px",
                                            background:
                                                "rgba(0,0,0,0.8)",
                                            color: "#fbbf24",
                                            padding: "6px 10px",
                                            borderRadius: "20px",
                                            fontSize: "14px",
                                            fontWeight: "600"
                                        }}
                                    >

                                        ⭐ 4.5

                                    </div>

                                </div>


                                {/* =================================================
                                    CARD CONTENT
                                ================================================= */}

                                <div className="p-4">


                                    {/* Movie Title */}

                                    <h4
                                        className="fw-bold text-white mb-3"
                                        style={{
                                            minHeight: "30px"
                                        }}
                                    >

                                        {movie.title}

                                    </h4>


                                    {/* Genre + Language */}

                                    <div className="mb-3">

                                        <span
                                            className="badge me-2"
                                            style={{
                                                backgroundColor: "#dc2626",
                                                padding: "7px 11px",
                                                borderRadius: "20px"
                                            }}
                                        >

                                            {movie.genre}

                                        </span>


                                        <span
                                            className="badge"
                                            style={{
                                                backgroundColor: "#334155",
                                                color: "#e2e8f0",
                                                padding: "7px 11px",
                                                borderRadius: "20px"
                                            }}
                                        >

                                            {movie.language}

                                        </span>

                                    </div>


                                    {/* Duration + Release */}

                                    <div
                                        className="d-flex gap-3 mb-3"
                                        style={{
                                            color: "#cbd5e1",
                                            fontSize: "14px"
                                        }}
                                    >

                                        <span>

                                            <i className="bi bi-clock me-1"></i>

                                            {movie.duration} min

                                        </span>


                                        <span>

                                            <i className="bi bi-calendar3 me-1"></i>

                                            {movie.releaseDate}

                                        </span>

                                    </div>


                                    {/* Description */}

                                    <p
                                        style={{
                                            color: "#94a3b8",
                                            fontSize: "14px",
                                            lineHeight: "1.5",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "2",
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            minHeight: "42px"
                                        }}
                                    >

                                        {movie.description}

                                    </p>


                                    {/* Divider */}

                                    <hr
                                        style={{
                                            borderColor:
                                                "rgba(255,255,255,0.1)"
                                        }}
                                    />


                                    {/* View Shows Button */}

                                    <button
                                        className="btn w-100 fw-semibold"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #ef4444, #b91c1c)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "10px",
                                            padding: "11px"
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/shows/${movie.movieId}`
                                            )
                                        }
                                    >

                                        <i className="bi bi-ticket-perforated me-2"></i>

                                        View Shows

                                        <i className="bi bi-arrow-right ms-2"></i>

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}