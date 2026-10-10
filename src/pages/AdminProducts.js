import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import cleanupDeletedProduct from "../services/cleanupDeletedProduct";
import "../styles/AdminProducts.css";


function AdminProducts() {

    const {
        products,
        setProducts,
        loading,
        error
    } = useContext(ProductContext);

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const [categoryFilter, setCategoryFilter] =
        useState("all");

    const [stockFilter, setStockFilter] = useState("all");

    const categories =
        products.map(product => product.category);

    const productSets =
        new Set(categories);

    const categoryArray =
        Array.from(productSets);

    const [sortOption, setSortOption] =
        useState("default");

    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            const matchesCategory =
                categoryFilter === "all" ||
                product.category === categoryFilter;

            const matchesStock =
                stockFilter === "all" ||
                (stockFilter === "in-stock" && product.stock > 0) ||
                (stockFilter === "low-stock" && product.stock > 0 && product.stock <= 5) ||
                (stockFilter === "out-of-stock" && product.stock === 0);

            return matchesSearch && matchesCategory && matchesStock;
        });

    const sortedProducts =
        [...filteredProducts].sort((a, b) => {

            if (sortOption === "name-asc") {
                return a.title.localeCompare(b.title);
            }

            if (sortOption === "price-low") {
                return a.price - b.price;
            }

            if (sortOption === "price-high") {
                return b.price - a.price;
            }

            return 0;
        });

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
                product => product.id !== id
            )
        );
    };

    if (loading) {
        return <p className="admin-products-message">Loading products...</p>;
    }

    if (error) {
        return <p className="admin-products-error">{error}</p>;
    }

    return (
        <div className="admin-products-page">

            <div className="admin-products-header">

                <div>
                    <h1>Admin Product Management</h1>

                    <p>
                        Manage your store products, stock and categories.
                    </p>
                </div>

                <div className="admin-products-top-actions">

                    <button
                        className="dashboard-button"
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        Back to Dashboard
                    </button>

                    <button
                        className="add-product-button"
                        onClick={() =>
                            navigate("/products/add")
                        }
                    >
                        Add Product
                    </button>

                </div>

            </div>

            <div className="admin-products-filters">

                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />

                <select
                    value={categoryFilter}
                    onChange={(event) =>
                        setCategoryFilter(event.target.value)
                    }
                >

                    <option value="all">
                        All Categories
                    </option>

                    {categoryArray.map(category => (

                        <option
                            value={category}
                            key={category}
                        >
                            {category}
                        </option>

                    ))}

                </select>

                <select
                    value={stockFilter}
                    onChange={(event) =>
                        setStockFilter(event.target.value)
                    }
                >
                    <option value="all">
                        All Stock
                    </option>

                    <option value="in-stock">
                        In Stock
                    </option>

                    <option value="low-stock">
                        Low Stock
                    </option>

                    <option value="out-of-stock">
                        Out of Stock
                    </option>
                </select>

                <select
                    value={sortOption}
                    onChange={(event) =>
                        setSortOption(event.target.value)
                    }
                >

                    <option value="default">
                        Default Order
                    </option>

                    <option value="name-asc">
                        Name: A-Z
                    </option>

                    <option value="price-low">
                        Price: Low to High
                    </option>

                    <option value="price-high">
                        Price: High to Low
                    </option>

                </select>

                <button
                    className="clear-filters-button"
                    onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("all");
                        setSortOption("default");
                        setStockFilter("all");
                    }}
                >
                    Clear Filters
                </button>

            </div>

            <p className="products-found">
                Products Found: {filteredProducts.length}
            </p>

            {products.length === 0 ? (

                <p className="admin-products-empty">
                    No products available.
                </p>

            ) : sortedProducts.length === 0 ? (

                <p className="admin-products-empty">
                    No products found.
                </p>

            ) : (

                <div className="admin-products-table">

                    <div className="admin-products-table-header">
                        <span>Product</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span>Stock</span>
                        <span>Actions</span>
                    </div>

                    {sortedProducts.map(product => (

                        <div
                            className="admin-product-row"
                            key={product.id}
                        >

                            <div className="admin-product-info">

                                <img
                                    src={product.image}
                                    alt={product.title}
                                />

                                <h2>{product.title}</h2>

                            </div>

                            <div className="admin-product-category">
                                {product.category}
                            </div>

                            <div className="admin-product-price">
                                ${product.price}
                            </div>

                            <div className="admin-product-stock">

                                <strong>
                                    {product.stock ?? 0}
                                </strong>

                                <span className={
                                    product.stock === 0
                                        ? "stock-out"
                                        : product.stock <= 5
                                            ? "stock-low"
                                            : "stock-in"
                                }>
                                    {product.stock === 0
                                        ? "Out of Stock"
                                        : product.stock <= 5
                                            ? "Low Stock"
                                            : "In Stock"}
                                </span>

                            </div>

                            <div className="admin-product-actions">

                                <button
                                    className="edit-product-button"
                                    onClick={() =>
                                        navigate(
                                            `/products/${product.id}/edit`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-product-button"
                                    onClick={() =>
                                        handleDelete(product.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminProducts;