import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import "../styles/Wishlist.css";

function Wishlist() {

    const { wishlist, setWishlist } =
        useContext(WishlistContext);

    const { products } = useContext(ProductContext);

    const removeWish = (wish) => {

        setWishlist(prevWishlist =>
            prevWishlist.filter(
                (item) => item.id !== wish.id
            )
        );
    };

    return (
        <div className="wishlist-page">

            {wishlist.length === 0 ? (

                <p className="wishlist-empty">
                    Your Wishlist Is Empty
                </p>

            ) : (

                <>
                    <h1 className="wishlist-title">
                        My Wishlist
                    </h1>

                    <div className="wishlist-grid">

                        {wishlist.map((wish) => {

                            const currentProduct = products.find(
                                product => product.id === wish.id
                            );

                            const currentStock = currentProduct?.stock;

                            return (
                                <div
                                    key={wish.id}
                                    className="wishlist-card"
                                >

                                    <Link
                                        to={`/products/${wish.id}`}
                                        className="wishlist-product"
                                    >

                                        <img
                                            src={wish.image}
                                            alt={wish.title}
                                        />

                                        <h2>{wish.title}</h2>

                                        <p>
                                            Category: {wish.category}
                                        </p>

                                        <p className="wishlist-price">
                                            Price: {wish.price}
                                        </p>

                                        <p>
                                            Stock: {
                                                currentStock !== undefined
                                                    ? currentStock
                                                    : "Not Available"
                                            }
                                        </p>

                                        <p className="wishlist-stock-status">
                                            {currentStock === undefined
                                                ? "Stock Not Available"
                                                : currentStock === 0
                                                ? "Out of Stock"
                                                : "In Stock"}
                                        </p>

                                    </Link>

                                    <button
                                        className="remove-wishlist-button"
                                        onClick={() =>
                                            removeWish(wish)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>
                            );
                        })}

                    </div>
                </>

            )}

        </div>
    );
}

export default Wishlist;