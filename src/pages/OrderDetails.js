import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/OrderDetails.css";

function OrderDetails() {

    const { id } = useParams();

    const {user} = useContext(UserContext);

    const [order] = useState(() => {
        const savedOrders = localStorage.getItem("orders");
        
        if (!savedOrders) {
            return null;
        }

        const orders = JSON.parse(savedOrders);

        if (user.role === "admin") {
            const allOrders = Object.values(orders).flat();

            return allOrders.find(
                order => order.id === Number(id)
            );
        }

        const currentUser = orders[user.id] || [];

        return currentUser.find(
            order => order.id === Number(id)
        );
    });

    return (
        <div className="order-details-page">

            <div className="order-details-container">

                <h2 className="order-details-title">
                    Order Details
                </h2>

                {order ? (
                    <>

                        <div className="order-details-id">
                            <span>Order ID</span>
                            <strong>{order.id}</strong>
                        </div>

                        <div className="order-details-section">

                            <h3>Customer Details</h3>

                            <div className="order-customer-details">

                                <p>
                                    <strong>Name:</strong>{" "}
                                    {order.customer.name}
                                </p>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {order.customer.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {order.customer.phone}
                                </p>

                                <p>
                                    <strong>Address:</strong>{" "}
                                    {order.customer.address}
                                </p>

                                <p>
                                    <strong>Pincode:</strong>{" "}
                                    {order.customer.pincode}
                                </p>

                            </div>

                        </div>

                        <div className="order-details-section">
                            
                            <h3>Order Status</h3>

                            <p className="order-details-status">
                                {order.status || "Pending"}
                            </p>

                            <h3>Ordered Products</h3>

                            <div className="order-details-products">

                                {order.items.map(item => (

                                    <div
                                        key={item.id}
                                        className="order-details-product"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />

                                        <div className="order-details-product-info">

                                            <h4>{item.title}</h4>

                                            <p>
                                                Price: ${item.price}
                                            </p>

                                            <p>
                                                Quantity: {item.quantity}
                                            </p>

                                            <p className="order-details-subtotal">
                                                Subtotal: $
                                                {(item.price * item.quantity).toFixed(2)}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        <div className="order-details-total">

                            <h3>Total Amount</h3>

                            <p>
                                ${order.total.toFixed(2)}
                            </p>

                        </div>

                    </>
                ) : (

                    <p className="order-not-found">
                        Order not found.
                    </p>

                )}

                <div className="order-details-actions">

                    <Link to="/order-history">
                        <button>
                            Back to Order History
                        </button>
                    </Link>

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

export default OrderDetails;