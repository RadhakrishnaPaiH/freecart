import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function StatCard({ title, value, onClick }) { 
    return ( 
        <div 
            className={`stat-card ${onClick ? "clickable-stat-card" : ""}`}
            onClick={onClick}
        > 
            <h2>{title}</h2> 
            <p className="stat-value">{value}</p> 
        </div> 
    ); 
}

function AdminDashboard() {
    const {products} = useContext(ProductContext);

    const navigate = useNavigate();

    const categories = products.map((product) => product.category);
    const productSets = new Set(categories);
    const categoryArray = Array.from(productSets);

    const savedOrders = localStorage.getItem("orders");
    const orders = savedOrders ? JSON.parse(savedOrders) : {};

    const allOrders = Object.values(orders).flat();

    const savedUsers = localStorage.getItem("users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const totalRevenue = allOrders
    .filter(order => order.status !== "Cancelled")
    .reduce(
        (total, order) => total + order.total,
        0
    );

    const lowStockProducts = products.filter(
        (product) => product.stock > 0 && product.stock <= 5
    );

    return (
        <div className="admin-dashboard">

            <div className="admin-dashboard-header">

                <h1>Admin Dashboard</h1>

                <p>
                    Manage your store, products, orders and users.
                </p>

            </div>

            <div className="stats-grid">

                <StatCard
                    title="Products"
                    value={products.length}
                />

                <StatCard
                    title="Categories"
                    value={categoryArray.length}
                />

                <StatCard
                    title="Orders"
                    value={allOrders.length}
                />

                <StatCard 
                    title="Users" 
                    value={users.length}
                    onClick={() => navigate("/admin/users")}
                />

                <StatCard
                    title="Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                />

                <StatCard
                    title="Low Stock"
                    value={lowStockProducts.length}
                    onClick={() => navigate("/admin/products")}
                />

            </div>

            <div className="admin-actions">

                <h2>Product Management</h2>

                <div className="admin-action-buttons">

                    <button
                        onClick={() => navigate("/products/add")}
                    >
                        Add Product
                    </button>

                    <button
                        onClick={() => navigate("/admin/products")}
                    >
                        Manage Products
                    </button>

                    <button
                        onClick={() => navigate("/admin/orders")}
                    >
                        Manage Orders
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;