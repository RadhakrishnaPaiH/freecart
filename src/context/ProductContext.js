import { createContext, useEffect, useState } from "react";
import fetchProducts from "../services/fetchService";

export const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            const savedProducts = localStorage.getItem("products");

            if (savedProducts && JSON.parse(savedProducts).length > 0) {
                const existingProducts = JSON.parse(savedProducts);

                const updatedProducts = existingProducts.map(product => ({
                    ...product,
                    stock: product.stock ?? 10
                }));

                setProducts(updatedProducts);
                setLoading(false);
                return;
            }

            try {
                const result = await fetchProducts();

                const productsWithStock = result.map(product => ({
                    ...product,
                    stock: 10
                }));

                setProducts(productsWithStock);
            } catch (error) {
                setError("Can't Load Product");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    return (
        <ProductContext.Provider
            value={{ products, setProducts, loading, error }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;