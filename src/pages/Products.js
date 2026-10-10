import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import useProductFilters from "../hooks/useProductFilters";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import "../styles/Products.css";

function Products() {
    const { products, loading, error } = useContext(ProductContext);

    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const catFilter = searchParams.get("category") || "all";
    const sortFilter = searchParams.get("sort") || "all";

    const urlPage = searchParams.get("page");
    const currentPage = Number(urlPage || 1);

    const { finalProducts } = useProductFilters({
        products,
        catFilter,
        sortFilter,
        search
    });

    const { totalPages, pageBtn, paginatedProducts } = usePagination({
        finalProducts,
        currentPage
    });

    const categories = products.map((product) => product.category);
    const productSets = new Set(categories);
    const categoryArray = Array.from(productSets);

    useEffect(() => {
        const page = Number(urlPage || 1);

        if (page <= 0 || isNaN(page) || totalPages === 0) {
            const params = new URLSearchParams(searchParams);

            params.delete("page");

            setSearchParams(params);
        } 
        else if (page > totalPages) {
            const params = new URLSearchParams(searchParams);

            params.set("page", totalPages);

            setSearchParams(params);
        }

    }, [searchParams, setSearchParams, totalPages, urlPage]);


    if (loading) {
        return <p className="products-message">Loading...</p>;
    }

    if (error) {
        return <p className="products-error">{error}</p>;
    }

    if (products.length === 0) {
        return <p className="products-empty">No Products Found</p>;
    }

    return (
        <div className="products-page">
            <h1 className="products-title">Products</h1>
            
            <div className="search-section">
                <label>Search: </label>

                <input
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value;

                        const newParams = new URLSearchParams(searchParams);

                        if (value === "") {
                            newParams.delete("search");
                        } else {
                            newParams.set("search", value);
                        }

                        newParams.delete("page");

                        setSearchParams(newParams);
                    }}
                />
            </div>

            <div className="category-section">
                <label>Filter By Category: </label>

                <button
                    className={`category-button ${catFilter === "all" ? "active-category" : ""}`}
                    onClick={() => {
                        const newParams = new URLSearchParams(searchParams);

                        newParams.delete("category");
                        newParams.delete("page");

                        setSearchParams(newParams);
                    }}
                >
                    All
                </button>

                {categoryArray.map((category) => (
                    <button
                        className={`category-button ${catFilter === category ? "active-category" : ""}`}
                        key={category}
                        onClick={() => {
                            const newParams = new URLSearchParams(searchParams);

                            newParams.set("category", category);
                            newParams.delete("page");

                            setSearchParams(newParams);
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="sort-section">
                <label>Sort: </label>

                <select
                    value={sortFilter}
                    onChange={(e) => {
                        const value = e.target.value;

                        const newParams = new URLSearchParams(searchParams);

                        if (value === "all") {
                            newParams.delete("sort");
                        } else {
                            newParams.set("sort", value);
                        }

                        newParams.delete("page");

                        setSearchParams(newParams);
                    }}
                >
                    <option value="all">All</option>
                    <option value="lowhigh">Low-High</option>
                    <option value="highlow">High-Low</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
            </div>

            {paginatedProducts.length === 0 ? (
                <p className="products-no-match">No Matching Products Found</p>
            ) : (
                <div className="products-grid">
                    {paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageBtn={pageBtn}
                onPageChange={(page) => {
                    const newParams = new URLSearchParams(searchParams);

                    if (page === 1) {
                        newParams.delete("page");
                    } else {
                        newParams.set("page", page);
                    }

                    setSearchParams(newParams);
                }}
            />

        </div>
    );
}

export default Products;