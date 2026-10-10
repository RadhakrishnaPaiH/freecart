import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import cancelOrder from "../services/cancelOrder";
import { ProductContext } from "../context/ProductContext";
import "../styles/OrderHistory.css";

function OrderHistory() {
    const navigate = useNavigate();
    console.log("ORDER HISTORY RENDERED");

    const {user} = useContext(UserContext);

    const { products, setProducts } = useContext(ProductContext);

    console.log("===== ORDER HISTORY USER =====", user);

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");

        if (!savedOrders) {
            return [];
        }

        const userOrders = JSON.parse(savedOrders);

        if(!userOrders[user.id]){
            userOrders[user.id] = [];
        }
        console.log(user);
        return userOrders[user.id];
    });

    const handleCancelOrder = (orderId) => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) {
            return;
        }
        
        const success = cancelOrder(
            orderId,
            user.id,
            products,
            setProducts
        );

        if (success) {
            const savedOrders = localStorage.getItem("orders");
            const updatedOrders = JSON.parse(savedOrders);

            setOrders(updatedOrders[user.id] || []);
        }
    };

    return (
        <div className="order-history-page">

            <h2 className="order-history-title">
                Order History
            </h2>

            {orders.length === 0 ? (

                <p className="order-history-empty">
                    No orders found.
                </p>

            ) : (

                <div className="order-history-list">

                    {orders.map(order => {

                        const totalQuantity = order.items.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                        );

                        return (

                            <div
                                key={order.id}
                                className="order-history-card"
                            >

                                <div className="order-history-header">
                                    <h3>
                                        Order ID: {order.id}
                                    </h3>
                                </div>

                                <div className="order-history-details">

                                    <p>
                                        <strong>Customer:</strong>{" "}
                                        {order.customer.name}
                                    </p>

                                    <p>
                                        <strong>Products:</strong>{" "}
                                        {order.items.length}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {order.status || "Pending"}
                                    </p>

                                    <p>
                                        <strong>Item Count:</strong>{" "}
                                        {totalQuantity}
                                    </p>

                                    <p className="order-history-total">
                                        <strong>Total:</strong>{" "}
                                        ${order.total.toFixed(2)}
                                    </p>

                                </div>

                                <button
                                    className="view-order-button"
                                    onClick={() =>
                                        navigate(`/orders/${order.id}`)
                                    }
                                >
                                    View Order
                                </button>

                                {order.status !== "Shipped" &&
                                order.status !== "Out for Delivery" &&
                                order.status !== "Delivered" &&
                                order.status !== "Cancelled" && (
                                    <button
                                        className="cancel-order-button"
                                        onClick={() => handleCancelOrder(order.id)}
                                    >
                                        Cancel Order
                                    </button>
                                )}

                            </div>

                        );
                    })}

                </div>

            )}

        </div>
    );
}

export default OrderHistory;