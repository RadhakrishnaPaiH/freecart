import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import cancelOrder from "../services/cancelOrder";
import "../styles/AdminOrders.css";

function OrderCard({ order, onStatusChange, onViewOrder }) {
    const totalItems = order.items.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return (
        <div className="order-card">

            <div className="order-card-header">

                <div>
                    <h2>
                        Order #{order.id}
                    </h2>

                    <p className="order-items-count">
                        {totalItems} Items
                    </p>
                </div>

                <button
                    className="view-order-button"
                    onClick={() => onViewOrder(order.id)}
                >
                    View Order
                </button>

            </div>

            <p className="order-date">
                <strong>Order Date:</strong>{" "}
                {new Date(order.id).toLocaleString()}
            </p>

            <div className="order-section">

                <h3>Customer Details</h3>

                <div className="customer-details">

                    <p>
                        <strong>Customer:</strong> {order.customer.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {order.customer.email}
                    </p>

                    <p>
                        <strong>Phone:</strong> {order.customer.phone}
                    </p>

                    <p>
                        <strong>Address:</strong> {order.customer.address}
                    </p>

                    <p>
                        <strong>Pincode:</strong> {order.customer.pincode}
                    </p>

                </div>

            </div>

            <div className="order-section">

                <h3>Order Summary</h3>

                <div className="order-summary">

                    <p>
                        Total Items: {totalItems}
                    </p>

                    <p className="order-total">
                        Order Total: ${order.total}
                    </p>

                </div>

            </div>

            <div className="order-section">

                <h3>Order Status</h3>

                <div className="order-status">

                    <p>
                        Status:{" "}
                        <strong className={`status-badge status-${(order.status || "Pending").toLowerCase()}`}>
                            {order.status || "Pending"}
                        </strong>
                    </p>

                    <div className="status-control">

                        <label htmlFor={`status-${order.id}`}>
                            Order Status:
                        </label>

                        <select
                            className="order-status-select"
                            id={`status-${order.id}`}
                            value={order.status || "Pending"}
                            onChange={(event) =>
                                onStatusChange(order.id, event.target.value)
                            }
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                    </div>

                </div>

            </div>

            <div className="order-section">

                <h3>Items</h3>

                <div className="order-items">

                    {order.items.map((item) => (

                        <div
                            className="order-item"
                            key={item.id}
                        >

                            <div className="order-item-image">

                                <img
                                    src={item.image}
                                    alt={item.title}
                                />

                            </div>

                            <div className="order-item-info">

                                <h4>
                                    {item.title}
                                </h4>

                                <p>
                                    <strong>Quantity:</strong>{" "}
                                    {item.quantity}
                                </p>

                                <p>
                                    <strong>Unit Price:</strong>{" "}
                                    ${item.price}
                                </p>

                                <p>
                                    <strong>Item Total:</strong>{" "}
                                    ${item.price * item.quantity}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

function AdminOrders() {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");

        return savedOrders ? JSON.parse(savedOrders) : {};
    });

    const [statusFilter, setStatusFilter] = useState("all");

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const { products, setProducts } = useContext(ProductContext);

    const allOrders = Object.values(orders).flat();

    const filteredOrders = allOrders.filter((order) => {
        const orderStatus = order.status || "Pending";

        const matchesStatus =
            statusFilter === "all" ||
            orderStatus.toLowerCase() === statusFilter.toLowerCase();

        const matchesSearch =
            order.customer.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim()) ||
            order.customer.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim()) ||
            order.customer.phone
                .includes(searchTerm.trim());

        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = (orderId, newStatus) => {

        const currentOrder = allOrders.find(
            order => order.id === orderId
        );

        if (!currentOrder) {
            return;
        }

        if (
            currentOrder.status === "Cancelled" &&
            newStatus !== "Cancelled"
        ) {
            return;
        }

        if (newStatus === "Cancelled") {
            const order = allOrders.find(
                order => order.id === orderId
            );

            if (!order) {
                return;
            }

            const success = cancelOrder(
                orderId,
                order.userId,
                products,
                setProducts
            );

            if (success) {
                const savedOrders = localStorage.getItem("orders");

                setOrders(
                    savedOrders
                        ? JSON.parse(savedOrders)
                        : {}
                );
            }

            return;
        }

        const updatedOrders = { ...orders };

        Object.keys(updatedOrders).forEach((userId) => {
            updatedOrders[userId] = updatedOrders[userId].map((order) => {
                if (order.id === orderId) {
                    return {
                        ...order,
                        status: newStatus
                    };
                }

                return order;
            });
        });

        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        setOrders(updatedOrders);
    };

    return (
        <div className="admin-orders-page">

            <div className="admin-orders-header">

                <div>
                    <h1>Admin Order Management</h1>

                    <p>
                        Review customer orders and manage their status.
                    </p>
                </div>

                <button
                    className="dashboard-button"
                    onClick={() => navigate("/admin")}
                >
                    Back to Dashboard
                </button>

            </div>

            <div className="orders-overview">

                <div className="orders-count-card">

                    <span>Total Orders</span>

                    <strong>
                        {allOrders.length}
                    </strong>

                </div>

                <div className="orders-count-card">

                    <span>Orders Found</span>

                    <strong>
                        {filteredOrders.length}
                    </strong>

                </div>

            </div>

            <div className="orders-filters">

                <input
                    className="order-search"
                    type="text"
                    placeholder="Search customer, email or phone"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <option value="all">All Orders</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button
                    className="clear-order-filter"
                    onClick={() => {
                        setStatusFilter("all");
                        setSearchTerm("");
                    }}
                >
                    Clear Filter
                </button>

            </div>

            <div className="current-filters">

                <p>
                    <strong>Current Filter:</strong>{" "}
                    {statusFilter === "all"
                        ? "All Orders"
                        : statusFilter}
                </p>

                <p>
                    <strong>Current Search:</strong>{" "}
                    {searchTerm
                        ? `"${searchTerm}"`
                        : "None"}
                </p>

            </div>

            {filteredOrders.length === 0 ? (

                <div className="no-orders">

                    <h2>No Orders Found</h2>

                    <p>
                        {searchTerm
                            ? `No orders found for "${searchTerm}".`
                            : statusFilter !== "all"
                            ? `No ${statusFilter} orders found.`
                            : "No orders found."
                        }
                    </p>

                </div>

            ) : (

                <div className="orders-grid">

                    {filteredOrders.map((order) => (

                        <OrderCard
                            key={order.id}
                            order={order}
                            onStatusChange={handleStatusChange}
                            onViewOrder={(orderId) =>
                                navigate(`/orders/${orderId}`)
                            }
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminOrders;