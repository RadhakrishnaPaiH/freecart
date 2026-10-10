import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/OrderConfirmation.css";

function OrderConfirmation() {
    const {user} = useContext(UserContext);
    const [order] = useState(() => {
        const savedOrders = localStorage.getItem("orders");

        if (!savedOrders) {
            return null;
        }

        const orders = JSON.parse(savedOrders);

        const userOrders = orders[user.id] || [];

        return userOrders[userOrders.length - 1];
    });

    if (!order) {
        return (
            <div className="order-not-found">
                <h2>No Order Found</h2>
                <p>There is no recent order to display.</p>
            </div>
        );
    }

    return (
        <div className="order-confirmation-page">

            <div className="order-confirmation-container">

                <div className="order-success">
                    <h2>Order Placed Successfully!</h2>
                    <p className="order-success-message">
                        Thank you for your purchase.
                    </p>
                </div>

                <div className="order-id">
                    <span>Order ID</span>
                    <strong>{order.id}</strong>
                </div>

                <div className="order-section">

                    <h3>Customer Details</h3>

                    <div className="customer-details">
                        <p>
                            <strong>Name:</strong> {order.customer.name}
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

                    <h3>Total Amount</h3>

                    <p className="order-total">
                        ${order.total.toFixed(2)}
                    </p>

                </div>

                <div className="order-section">

                    <h3>Ordered Products</h3>

                    <div className="ordered-products">

                        {order.items.map(item => (

                            <div
                                key={item.id}
                                className="ordered-product"
                            >

                                <img
                                    src={item.image}
                                    alt={item.title}
                                />

                                <div className="ordered-product-info">

                                    <h4>{item.title}</h4>

                                    <p>
                                        Price: ${item.price}
                                    </p>

                                    <p>
                                        Quantity: {item.quantity}
                                    </p>

                                    <p className="ordered-subtotal">
                                        Subtotal: $
                                        {(item.price * item.quantity).toFixed(2)}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="order-confirmation-actions">

                    <Link to="/">
                        <button>
                            Continue Shopping
                        </button>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default OrderConfirmation;