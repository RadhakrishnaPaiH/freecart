import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/Login.css";

function Login() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        setError("");

        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = savedUsers.find(
            user =>
                user.email === email &&
                user.password === password
        );

        if (foundUser && (foundUser.status || "active") === "inactive") {
            setError("Your account has been deactivated. Please contact support.");
            return;
        }
        
        if (!foundUser) {
            setError("Invalid email or password");
            return;
        }

        setUser(foundUser);
        navigate("/");
    };

    return (
        <div className="login-page">

            <div className="login-brand">
                <h1>NEXORA</h1>
                <p>Your store, your account.</p>
            </div>

            <div className="login-card">

                <div className="auth-navigation">
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "auth-nav-link active-auth-link"
                                : "auth-nav-link"
                        }
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive
                                ? "auth-nav-link active-auth-link"
                                : "auth-nav-link"
                        }
                    >
                        Register
                    </NavLink>
                </div>

                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue to NEXORA.</p>
                </div>

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <div className="login-field">
                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div className="login-field">
                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;
