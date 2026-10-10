import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name || !email || !phone || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = savedUsers.find(
            user => user.email === email
        );

        if (existingUser) {
            setError("Email already registered");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            phone,
            password,
            role: email === "admin@productstore.com" ? "admin" : "user",
            status: "active"
        };

        localStorage.setItem(
            "users",
            JSON.stringify([...savedUsers, newUser])
        );

        setSuccess("Registration successful");

        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <div className="register-page">

            <div className="register-brand">
                <h1>NEXORA</h1>
                <p>Your store, your account.</p>
            </div>

            <div className="register-card">

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

                <div className="register-header">
                    <h2>Create Your Account</h2>
                    <p>Join NEXORA and start shopping.</p>
                </div>

                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    <div className="register-field">
                        <label>
                            Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="register-field">
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

                    <div className="register-field">
                        <label>
                            Phone
                        </label>

                        <input
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />
                    </div>

                    <div className="register-field">
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

                    <div className="register-field">
                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </div>

                    {error && (
                        <p className="register-error">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="register-success">
                            {success}
                        </p>
                    )}

                    <button
                        className="register-button"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;