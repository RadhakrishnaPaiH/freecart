import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

function Navbar() {
    const {cart} = useContext(CartContext);

    const { user, setUser } = useContext(UserContext);

    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("darkMode");
        return savedTheme === "true";
    });

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0 );

    useEffect(() => {
        document.body.classList.toggle("dark-theme", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

  return (
    <nav className="navbar">
        <NavLink to="/" className="store-name">
            FreeCart
        </NavLink>

        <div className="nav-links">
            {user?.role === "admin" ? (
                <>
                    <NavLink to="/admin" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    } end>
                        Admin Dashboard
                    </NavLink>

                    <NavLink to="/admin/products" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        Manage Products
                    </NavLink>

                    <NavLink to="/products/add" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        Add Product
                    </NavLink>

                    <NavLink to="/admin/orders" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        Manage Orders
                    </NavLink>

                    <NavLink to="/admin/users" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        Manage Users
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    } end>
                        Products
                    </NavLink>

                    <NavLink to="/wishlist" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        ❤️ Wishlist
                    </NavLink>

                    <NavLink to="/cart" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        🛒 Cart[{totalQuantity}]
                    </NavLink>

                    <NavLink to="/order-history" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        📦 Order History
                    </NavLink>
                </>
            )}
        </div>

        <div className="nav-user">
            <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? "☀" : "☾"}
            </button>
            {user ? (
                <>  
                    {user.role === "admin" 
                        ? <span className="user-name">Hi, {user.name} (Admin)</span>
                        : <span className="user-name">Welcome, {user.name}</span>
                    }
                    <button onClick={() => setUser(null)}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Register
                    </NavLink>
                </>
            )}
        </div>
        
    </nav>
  )
}

export default Navbar