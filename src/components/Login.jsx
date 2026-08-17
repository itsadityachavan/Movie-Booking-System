import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");


    const handleLogin = (e) => {

        e.preventDefault();

        setError("");

        // Fixed login credentials
        if (username === "itsaditya" && password === "1234") {

            console.log("LOGIN SUCCESSFUL");

            // Store login status
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);

            // Go to Home
            navigate("/home");

        } else {

            setError("Invalid email/username or password.");

        }
    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "30px"
            }}
        >

            <div
                className="card border-0 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "430px",
                    borderRadius: "20px",
                    overflow: "hidden"
                }}
            >

                <div className="card-body p-4 p-md-5">

                    {/* Logo */}

                    <div className="text-center mb-4">

                        <div
                            className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3"
                            style={{
                                width: "65px",
                                height: "65px",
                                fontSize: "30px"
                            }}
                        >
                            🎬
                        </div>

                        <h2 className="fw-bold mb-1">
                            Welcome Back
                        </h2>

                        <p className="text-muted mb-0">
                            Login to continue booking movies
                        </p>

                    </div>


                    {/* Error Message */}

                    {error && (

                        <div
                            className="alert alert-danger py-2"
                            role="alert"
                        >

                            <i className="bi bi-exclamation-circle me-2"></i>

                            {error}

                        </div>

                    )}


                    <form onSubmit={handleLogin}>

                        {/* Email / Username */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">
                                Email / Username
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-light">
                                    <i className="bi bi-person"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email / username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div className="mb-4">

                            <label className="form-label fw-semibold">
                                Password
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-light">
                                    <i className="bi bi-lock"></i>
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >

                                    <i
                                        className={
                                            showPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>

                                </button>

                            </div>

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-semibold"
                        >

                            <i className="bi bi-box-arrow-in-right me-2"></i>

                            Login

                        </button>

                    </form>


                    {/* Demo Credentials */}

                    <div className="text-center mt-4">

                        <small className="text-muted">
                            Demo Login
                        </small>

                        <div className="mt-1">

                            <span className="badge bg-light text-dark border me-1">
                                User: itsaditya
                            </span>

                            <span className="badge bg-light text-dark border">
                                Password: 1234
                            </span>

                        </div>

                    </div>


                    {/* Back to Home */}

                    <div className="text-center mt-4">

                        <button
                            className="btn btn-link text-muted text-decoration-none"
                            onClick={() => navigate("/home")}
                        >

                            <i className="bi bi-arrow-left me-1"></i>

                            Back to Home

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}