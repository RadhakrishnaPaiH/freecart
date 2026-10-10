import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {

    const { wishlist, setWishlist } = useContext(WishlistContext);

    const { setCart } = useContext(CartContext);

    const isWishlisted = wishlist.some(
        wish => wish.id === product.id
    );

    const toggleWish = () => {

        if (!isWishlisted) {
            setWishlist(prevWishlist => [
                ...prevWishlist,
                product
            ]);
        } else {
            setWishlist(prevWishlist =>
                prevWishlist.filter(
                    item => item.id !== product.id
                )
            );
        }
    };

    const addToCart = () => {
        if (product.stock !== undefined && product.stock <= 0) {
            return;
        }

        setCart(prevCart => {

            const existingItem = prevCart.find(
                item => item.id === product.id
            );

            if (existingItem) {
                if (
                    product.stock !== undefined &&
                    existingItem.quantity >= product.stock
                ) {
                    return prevCart;
                }

                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prevCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };

    return (
        <div className="product-card">

            <Link to={`/products/${product.id}`}>

                <img
                    src={product.image}
                    alt={product.title}
                />

                <h2>{product.title}</h2>

                <p>
                    Category: {product.category}
                </p>

                <p>
                    Price: ${product.price.toFixed(2)}
                </p>

                <p>
                    Stock: {product.stock ?? 0}
                </p>

                <p>
                    {product.stock === 0
                        ? "Out of Stock"
                        : "In Stock"}
                </p>

            </Link>

            <button className="wishlist-button" onClick={toggleWish}>
                {isWishlisted
                    ? "Wishlisted"
                    : "Add To Wishlist"}
            </button>

            <button
                className="cart-button"
                onClick={addToCart}
                disabled={product.stock === 0}
            >
                {product.stock === 0
                    ? "Out of Stock"
                    : "Add To Cart"}
            </button>

        </div>
    );
}

export default ProductCard;