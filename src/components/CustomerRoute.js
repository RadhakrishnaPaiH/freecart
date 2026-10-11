
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function CustomerRoute({ children }) {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default CustomerRoute;
