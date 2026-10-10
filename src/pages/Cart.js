import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {

    const { cart, setCart } = useContext(CartContext);
    const { products } = useContext(ProductContext);

    const increaseBtn = (id) => {

        const currentProduct = products.find(
            product => product.id === id
        );

        const currentStock = currentProduct?.stock;

        setCart(prevCart =>
            prevCart.map(item => {

                if (item.id !== id) {
                    return item;
                }

                if (
                    currentStock !== undefined &&
                    item.quantity >= currentStock
                ) {
                    return item;
                }

                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            })
        );
    };

    const decreaseBtn = (id) => {

        setCart(prevCart => {

            const item = prevCart.find(
                item => item.id === id
            );

            if (!item) {
                return prevCart;
            }

            if (item.quantity <= 1) {

                return prevCart.filter(
                    item => item.id !== id
                );
            }

            return prevCart.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            );
        });
    };

    const removeCartItem = (id) => {

        setCart(prevCart =>
            prevCart.filter(
                item => item.id !== id
            )
        );
    };

    const totalCart = cart.reduce(
        (acc, item) =>
            acc + (item.quantity * item.price),
        0
    );

    return (
        <div className="cart-page">

            {cart.length === 0 ? (

                <p className="cart-empty">Your Cart Is Empty</p>

            ) : (

                <>

                    <h1 className="cart-title">Shopping Cart</h1>

                    <div className="cart-items">

                        {cart.map(item => {

                            const currentProduct = products.find(
                                product => product.id === item.id
                            );

                            const currentStock = currentProduct?.stock;

                            return (
                                <div
                                    key={item.id}
                                    className="cart-item"
                                >

                                    <Link
                                        to={`/products/${item.id}`}
                                        className="cart-product"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />

                                        <div className="cart-product-info">

                                            <h2>{item.title}</h2>

                                            <p>
                                                Category: {item.category}
                                            </p>

                                            <p className="cart-price">
                                                Price: ${item.price}
                                            </p>

                                            <p>
                                                Stock: {
                                                    currentStock !== undefined
                                                        ? currentStock
                                                        : "Not Available"
                                                }
                                            </p>

                                            <p className="cart-stock-status">
                                                {currentStock === undefined
                                                    ? "Stock Not Available"
                                                    : currentStock === 0
                                                    ? "Out of Stock"
                                                    : "In Stock"}
                                            </p>

                                        </div>

                                    </Link>

                                    <div className="cart-controls">

                                        <div className="quantity-controls">

                                            <button
                                                onClick={() =>
                                                    decreaseBtn(item.id)
                                                }
                                            >
                                                [-]
                                            </button>

                                            <span>
                                                Quantity: {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseBtn(item.id)
                                                }
                                                disabled={
                                                    currentStock === 0 ||
                                                    currentStock === undefined ||
                                                    item.quantity >= currentStock
                                                }
                                            >
                                                [+]
                                            </button>

                                        </div>

                                        <p className="cart-subprice">
                                            SubPrice: $
                                            {(item.price * item.quantity).toFixed(2)}
                                        </p>

                                        <button
                                            className="remove-cart-button"
                                            onClick={() =>
                                                removeCartItem(item.id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    <div className="cart-summary">

                        <h2>Cart Summary</h2>

                        <p>
                            Total Amount: $
                            {totalCart.toFixed(2)}
                        </p>

                        <Link to="/checkout">
                            <button className="checkout-button">
                                Proceed to Checkout
                            </button>
                        </Link>

                    </div>

                </>

            )}

        </div>
    );
}

export default Cart;