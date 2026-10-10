import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

function Checkout() {

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phone: "",

        address: "",

        pincode: ""

    });

    const [validationError, setValidationError] = useState({});

    const { cart, setCart } = useContext(CartContext);

    const { user } = useContext(UserContext);

    const { products, setProducts } = useContext(ProductContext);

    const navigate = useNavigate();


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prevData => ({

            ...prevData,

            [name]: value

        }));

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        const errors = {};


        if (formData.name.trim() === "") {

            errors.name = "Name is required";

        }


        const emailPattern =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {

            errors.email = "Enter a valid email address";

        }


        if (!/^\d{10}$/.test(formData.phone)) {

            errors.phone = "Phone must be 10 digits";

        }


        if (formData.address.trim() === "") {

            errors.address = "Address is required";

        }


        if (!/^\d{6}$/.test(formData.pincode)) {

            errors.pincode = "Pincode must be 6 digits";

        }


        const stockError = cart.some(item => {

            const currentProduct = products.find(

                product => product.id === item.id

            );


            if (!currentProduct) {

                return false;

            }


            const currentStock = currentProduct.stock;


            return (

                currentStock !== undefined &&

                (

                    currentStock === 0 ||

                    item.quantity > currentStock

                )

            );

        });


        if (stockError) {

            errors.stock =

                "Some products have insufficient stock. Please update your cart.";

        }


        setValidationError(errors);


        if (Object.keys(errors).length > 0) {

            return;

        }


        const confirmCheckout = window.confirm(

            "Have you checked all information?"

        );


        if (!confirmCheckout) {

            return;

        }


        const updatedProducts = products.map(product => {

            const orderedItem = cart.find(item => item.id === product.id);


            if (!orderedItem) {

                return product;

            }


            return {

                ...product,

                stock: product.stock - orderedItem.quantity

            };

        });


        setProducts(updatedProducts);


        const order = {

            id: Date.now(),

            userId: user.id,

            customer: formData,

            items: cart,

            total: cart.reduce(

                (acc, item) =>

                    acc + item.price * item.quantity,

                0

            ),

            status: "Pending"

        };


        const savedOrders =

            localStorage.getItem("orders");


        let orders = {};


        if (savedOrders) {

            try {

                orders = JSON.parse(savedOrders);

            } catch (error) {

                orders = {};

            }

        }


        if (!orders[user.id]) {

            orders[user.id] = [];

        }


        orders[user.id].push(order);


        localStorage.setItem(

            "orders",

            JSON.stringify(orders)

        );


        setCart([]);

        console.log(order);

        navigate("/order-confirmation");

    };


    return (

        <div className="checkout-page">

            <div className="checkout-container">

                <h2 className="checkout-title">
                    Checkout Details
                </h2>

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    <div className="checkout-field">

                        <label htmlFor="name">
                            Name:
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        {validationError.name && (

                            <p className="checkout-error">
                                {validationError.name}
                            </p>

                        )}

                    </div>


                    <div className="checkout-field">

                        <label htmlFor="email">
                            Email:
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        {validationError.email && (

                            <p className="checkout-error">
                                {validationError.email}
                            </p>

                        )}

                    </div>


                    <div className="checkout-field">

                        <label htmlFor="phone">
                            Phone:
                        </label>

                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        {validationError.phone && (

                            <p className="checkout-error">
                                {validationError.phone}
                            </p>

                        )}

                    </div>


                    <div className="checkout-field">

                        <label htmlFor="address">
                            Address:
                        </label>

                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        {validationError.address && (

                            <p className="checkout-error">
                                {validationError.address}
                            </p>

                        )}

                    </div>


                    <div className="checkout-field">

                        <label htmlFor="pincode">
                            Pincode:
                        </label>

                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />

                        {validationError.pincode && (

                            <p className="checkout-error">
                                {validationError.pincode}
                            </p>

                        )}

                    </div>


                    {validationError.stock && (

                        <p className="checkout-stock-error">
                            {validationError.stock}
                        </p>

                    )}


                    <button
                        className="place-order-button"
                        type="submit"
                    >
                        Place Order
                    </button>

                </form>

            </div>

        </div>

    );
}

export default Checkout;