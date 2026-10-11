import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import "../styles/ProductDetails.css";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const {
        products,
        loading,
        error
    } = useContext(ProductContext);

    const { wishlist, setWishlist } = useContext(WishlistContext);

    const { setCart } = useContext(CartContext);

    const product = products.find(
        (product) => product.id === Number(id)
    );

    if (loading) {
        return <p className="product-details-message">Loading...</p>;
    }

    if (error) {
        return <p className="product-details-error">{error}</p>;
    }

    if (!product) {
        return <p className="product-details-message">Product Not Found</p>;
    }

    const isWishlisted = wishlist.some(
        (wish) => wish.id === product.id
    );

    const toggleWish = (product) => {

        if (!isWishlisted) {
            setWishlist(prevWishlist => [
                ...prevWishlist,
                product
            ]);
        } else {
            setWishlist(prevWishlist =>
                prevWishlist.filter(
                    (item) => item.id !== product.id
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
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
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
        <>
            <div className="product-details-navigation">

                <Link to={"/"}>
                    Back To Products
                </Link>

                {user && user.role === "admin" && (
                    <button
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        Back to Product Management
                    </button>
                )}

            </div>

            <div className="product-details">

                <div className="product-details-image">
                    <img
                        src={product.image}
                        alt={product.title}
                    />
                </div>

                <div className="product-details-content">

                    <h2>{product.title}</h2>

                    <p className="product-price">
                        Price: {product.price}
                    </p>

                    <p>
                        Stock: {product.stock ?? 0}
                    </p>

                    <p className="product-stock-status">
                        {product.stock === 0
                            ? "Out of Stock"
                            : "In Stock"}
                    </p>

                    <p>
                        Category: {product.category}
                    </p>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <div className="product-actions">

                        <button
                            onClick={() =>
                                toggleWish(product)
                            }
                        >
                            {isWishlisted
                                ? "Wishlisted"
                                : "Add To Wishlist"}
                        </button>

                        <button
                            onClick={addToCart}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0
                                ? "Out of Stock"
                                : "Add To Cart"}
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ProductDetails;