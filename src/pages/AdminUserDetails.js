import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/AdminUserDetails.css';

function AdminUserDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user] = useState(() => {
        const savedUsers = localStorage.getItem("users");
        const users = savedUsers ? JSON.parse(savedUsers) : [];

        return users.find(user => user.id === Number(id));
    });

    const [userOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");
        const orders = savedOrders ? JSON.parse(savedOrders) : [];

        return orders[id] || [];
    });

    const totalSpending = userOrders.reduce((total, order) => total + order.total, 0);

    return (
        <div className="admin-user-details-page">

            {user ? (
                <>
                    <div className="user-details-header">
                        <div>
                            <h1>User Details</h1>
                            <p>View account information and order activity.</p>
                        </div>

                        <button
                            className="back-users-button"
                            onClick={() => navigate("/admin/users")}
                        >
                            Back to Users
                        </button>
                    </div>

                    <div className="user-details-grid">

                        <div className="user-info-card">
                            <h2>Account Information</h2>

                            <div className="user-info-row">
                                <span>Name</span>
                                <strong>{user.name}</strong>
                            </div>

                            <div className="user-info-row">
                                <span>Email</span>
                                <strong>{user.email}</strong>
                            </div>

                            <div className="user-info-row">
                                <span>Phone</span>
                                <strong>{user.phone}</strong>
                            </div>

                            <div className="user-info-row">
                                <span>Role</span>
                                <strong>{user.role}</strong>
                            </div>

                            <div className="user-info-row">
                                <span>Status</span>
                                <strong>{user.status || "active"}</strong>
                            </div>

                            <div className="user-info-row">
                                <span>User ID</span>
                                <strong>{user.id}</strong>
                            </div>
                        </div>

                        <div className="user-stats-card">
                            <h2>Order Summary</h2>

                            <div className="user-stat">
                                <span>Total Orders</span>
                                <strong>{userOrders.length}</strong>
                            </div>

                            <div className="user-stat">
                                <span>Total Spending</span>
                                <strong>${totalSpending.toFixed(2)}</strong>
                            </div>
                        </div>

                    </div>

                    <div className="user-orders-section">
                        <h2>Order History</h2>

                        {userOrders.length === 0 ? (
                            <div className="no-user-orders">
                                <p>No orders found for this user.</p>
                            </div>
                        ) : (
                            <div className="user-orders-list">

                                {userOrders.map((order) => (
                                    <div
                                        className="user-order-card"
                                        key={order.id}
                                    >
                                        <div>
                                            <span>Order ID</span>
                                            <strong>{order.id}</strong>
                                        </div>

                                        <div>
                                            <span>Status</span>
                                            <strong>{order.status}</strong>
                                        </div>

                                        <div>
                                            <span>Total</span>
                                            <strong>
                                                ${order.total.toFixed(2)}
                                            </strong>
                                        </div>

                                        <button
                                            className="view-order-button"
                                            onClick={() =>
                                                navigate(`/orders/${order.id}`)
                                            }
                                        >
                                            View Order
                                        </button>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="user-not-found">
                    <h1>User Not Found</h1>
                    <p>The requested user could not be found.</p>

                    <button
                        className="back-users-button"
                        onClick={() => navigate("/admin/users")}
                    >
                        Back to Users
                    </button>
                </div>
            )}

        </div>
    );
}

export default AdminUserDetails;