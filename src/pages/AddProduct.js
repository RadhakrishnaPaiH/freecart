import { useContext, useState } from "react";
import addProduct from "../services/addProduct";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import "../styles/AddProduct.css";

function AddProduct() {

    const [addTitle, setAddTitle] = useState("");
    const [addPrice, setAddPrice] = useState("");
    const [addCategory, setAddCategory] = useState("");
    const [addDescription, setAddDescription] = useState("");
    const [addImage, setAddImage] = useState("");

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const [addError, setAddError] = useState({});

    const { setProducts } = useContext(ProductContext);

    const [addStock, setAddStock] = useState("");

    const addForm = async (e) => {

        e.preventDefault();

        let validationError = {};

        if (addTitle.trim() === "") {
            validationError.title = "Title required";
        }

        const price = Number(addPrice);

        const stock = Number(addStock);

        if (
            addStock.trim() === "" ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {
            setError(
                "Stock must be a whole number greater than or equal to 0"
            );
            return;
        }

        if (
            addPrice.trim() === "" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            validationError.price =
                "Price must be a valid number greater than 0";
        }

        if (addCategory.trim() === "") {
            validationError.category = "Category required";
        }

        if (addDescription.trim() === "") {
            validationError.description =
                "Description required";
        }

        if (addImage.trim() === "") {
            validationError.image = "Image required";
        }

        setAddError(validationError);

        if (Object.keys(validationError).length !== 0) {
            return;
        }

        const productData = {
            title: addTitle.trim(),
            price: price,
            category: addCategory.trim().toLowerCase(),
            description: addDescription.trim(),
            image: addImage.trim(),
            stock: stock
        };

        setSuccessMessage("");
        setError("");
        setLoading(true);

        try {

            const result = await addProduct(productData);

            setProducts(prevProducts => {

                const newId =
                    Math.max(
                        ...prevProducts.map(
                            product => product.id
                        ),
                        0
                    ) + 1;

                return [
                    ...prevProducts,
                    {
                        ...result,
                        id: newId
                    }
                ];
            });

            setSuccessMessage(
                "Product Added Successfully"
            );

            setAddTitle("");
            setAddPrice("");
            setAddCategory("");
            setAddDescription("");
            setAddImage("");
            setAddStock("");

        } catch (error) {

            setError(
                "Product Failed to be Added!"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="add-product-page">

            <div className="add-product-header">

                <button
                    className="back-dashboard-button"
                    onClick={() => navigate("/admin")}
                >
                    Back to Dashboard
                </button>

                <div>
                    <h1>Add Product</h1>

                    <p>
                        Add a new product to your store catalog.
                    </p>
                </div>

            </div>

            <form
                className="add-product-form"
                onSubmit={addForm}
            >

                <h2>Add Product Details</h2>

                <div className="form-field">

                    <label>
                        Product title:
                    </label>

                    <input
                        type="text"
                        value={addTitle}
                        onChange={(e) =>
                            setAddTitle(e.target.value)
                        }
                    />

                    {addError.title && (
                        <p className="form-error">
                            {addError.title}
                        </p>
                    )}

                </div>

                <div className="form-field">

                    <label>
                        Product Price:
                    </label>

                    <input
                        value={addPrice}
                        onChange={(e) =>
                            setAddPrice(e.target.value)
                        }
                    />

                    {addError.price && (
                        <p className="form-error">
                            {addError.price}
                        </p>
                    )}

                </div>

                <div className="form-field">

                    <label>
                        Product category:
                    </label>

                    <input
                        type="text"
                        value={addCategory}
                        onChange={(e) =>
                            setAddCategory(e.target.value)
                        }
                    />

                    {addError.category && (
                        <p className="form-error">
                            {addError.category}
                        </p>
                    )}

                </div>

                <div className="form-field">

                    <label>
                        Product description:
                    </label>

                    <input
                        type="text"
                        value={addDescription}
                        onChange={(e) =>
                            setAddDescription(e.target.value)
                        }
                    />

                    {addError.description && (
                        <p className="form-error">
                            {addError.description}
                        </p>
                    )}

                </div>

                <div className="form-field">

                    <label>
                        Product image:
                    </label>

                    <input
                        type="text"
                        value={addImage}
                        onChange={(e) =>
                            setAddImage(e.target.value)
                        }
                    />

                    {addError.image && (
                        <p className="form-error">
                            {addError.image}
                        </p>
                    )}

                </div>

                <div className="form-field">

                    <label>
                        Stock:
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={addStock}
                        onChange={(event) =>
                            setAddStock(event.target.value)
                        }
                    />

                </div>

                <button
                    className="submit-product-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Adding..."
                        : "Submit"}
                </button>

                {successMessage && (
                    <p className="form-success">
                        {successMessage}
                    </p>
                )}

                {error && (
                    <p className="form-error form-general-error">
                        {error}
                    </p>
                )}

            </form>

        </div>
    );
}

export default AddProduct;