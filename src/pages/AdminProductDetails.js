import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import cleanupDeletedProduct from "../services/cleanupDeletedProduct";
import "../styles/AdminProductDetails.css";

function AdminProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, setProducts } = useContext(ProductContext);

    const product = products.find(
        (item) => String(item.id) === id
    );

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        cleanupDeletedProduct(id);

        setProducts(prevProducts =>
            prevProducts.filter(
                product => String(product.id) !== String(id)
            )
        );

        navigate("/admin/products");
    };

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="admin-product-details">
            <img
                src={product.image}
                alt={product.title}
            />

            <div>
                <h1>{product.title}</h1>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.stock ?? 0}</p>
                <p><strong>Description:</strong></p>
                <p>{product.description || "No description available"}</p>
                <div className="admin-product-details-actions">
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                        Edit Product
                    </button>

                    <button
                        onClick={() => handleDelete(product.id)}
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminProductDetails;