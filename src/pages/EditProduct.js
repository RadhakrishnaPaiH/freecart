import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import editProduct from "../services/editProduct";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "../styles/EditProduct.css";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [editTitle, setEditTitle] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editStock, setEditStock] = useState("");

    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState("");

    const [editError, setEditError] = useState({});

    const { products, setProducts } =
        useContext(ProductContext);

    const product = products.find(
        (product) => product.id === Number(id)
    );

    useEffect(() => {

        if (product) {

            setEditTitle(product.title);
            setEditPrice(String(product.price));
            setEditCategory(product.category);
            setEditDescription(product.description);
            setEditImage(product.image);
            setEditStock(String(product.stock ?? 0));
        }

    }, [product]);

    const editForm = async (e) => {

        e.preventDefault();

        let validationError = {};

        if (editTitle.trim() === "") {
            validationError.title =
                "Title required";
        }

        const price = Number(editPrice);
        const stock = Number(editStock);

        if (
            editStock.trim() === "" ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {
            validationError.stock =
                "Stock must be a whole number greater than or equal to 0";
        }

        if (
            editPrice.trim() === "" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            validationError.price =
                "Price must be a valid number greater than 0";
        }

        if (editCategory.trim() === "") {
            validationError.category =
                "Category required";
        }

        if (editDescription.trim() === "") {
            validationError.description =
                "Description required";
        }

        if (editImage.trim() === "") {
            validationError.image =
                "Image required";
        }

        setEditError(validationError);

        if (Object.keys(validationError).length !== 0) {
            return;
        }

        const editData = {
            id: product.id,
            title: editTitle.trim(),
            price: price,
            category: editCategory.trim().toLowerCase(),
            description: editDescription.trim(),
            image: editImage.trim(),
            stock: stock
        };

        setUpdating(true);
        setUpdateError("");

        try {

            await editProduct(id, editData);

            setProducts(prevProducts =>
                prevProducts.map(prevProduct =>
                    prevProduct.id === Number(id)
                        ? editData
                        : prevProduct
                )
            );

            navigate(`/products/${id}`);

        } catch (error) {

            setUpdateError(
                "Edit Not Possible"
            );

        } finally {

            setUpdating(false);
        }
    };

    if (!product) {
        return (
            <p className="edit-product-not-found">
                Product Not Found
            </p>
        );
    }

    return (
        <div className="edit-product-page">

            <div className="edit-product-header">

                <div>
                    <h1>Edit Product</h1>

                    <p>
                        Update the details of your store product.
                    </p>
                </div>

            </div>

            <form
                className="edit-product-form"
                onSubmit={editForm}
            >

                <h2>Product Details</h2>

                <div className="edit-form-field">

                    <label>
                        Product title:
                    </label>

                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) =>
                            setEditTitle(e.target.value)
                        }
                    />

                    {editError.title && (
                        <p className="edit-form-error">
                            {editError.title}
                        </p>
                    )}

                </div>

                <div className="edit-form-field">

                    <label>
                        Product Price:
                    </label>

                    <input
                        value={editPrice}
                        onChange={(e) =>
                            setEditPrice(e.target.value)
                        }
                    />

                    {editError.price && (
                        <p className="edit-form-error">
                            {editError.price}
                        </p>
                    )}

                </div>

                <div className="edit-form-field">

                    <label>
                        Product category:
                    </label>

                    <input
                        type="text"
                        value={editCategory}
                        onChange={(e) =>
                            setEditCategory(e.target.value)
                        }
                    />

                    {editError.category && (
                        <p className="edit-form-error">
                            {editError.category}
                        </p>
                    )}

                </div>

                <div className="edit-form-field">

                    <label>
                        Product description:
                    </label>

                    <input
                        type="text"
                        value={editDescription}
                        onChange={(e) =>
                            setEditDescription(e.target.value)
                        }
                    />

                    {editError.description && (
                        <p className="edit-form-error">
                            {editError.description}
                        </p>
                    )}

                </div>

                <div className="edit-form-field">

                    <label>
                        Product image:
                    </label>

                    <input
                        type="text"
                        value={editImage}
                        onChange={(e) =>
                            setEditImage(e.target.value)
                        }
                    />

                    {editError.image && (
                        <p className="edit-form-error">
                            {editError.image}
                        </p>
                    )}

                </div>

                <div className="edit-form-field">

                    <label>
                        Stock:
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={editStock}
                        onChange={(event) =>
                            setEditStock(event.target.value)
                        }
                    />

                    {editError.stock && (
                        <p className="edit-form-error">
                            {editError.stock}
                        </p>
                    )}

                </div>

                <div className="edit-product-actions">

                    <button
                        className="save-edit-button"
                        type="submit"
                        disabled={updating}
                    >
                        {updating
                            ? "Editing..."
                            : "Submit"}
                    </button>

                    <button
                        className="cancel-edit-button"
                        type="button"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        Cancel
                    </button>

                </div>

                {updateError && (
                    <p className="edit-update-error">
                        {updateError}
                    </p>
                )}

            </form>

        </div>
    );
}

export default EditProduct;