import { createContext, useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

function CartProvider({ children }) {

    const {user} = useContext(UserContext);

    const [cart, setCart] = useState([]);
    const [cartLoaded, setCartLoaded] = useState(false);

    useEffect(() => {
        setCartLoaded(false);

        if (!user) {
            setCart([]);
            setCartLoaded(true);
            return;
        }

        const savedCarts = localStorage.getItem("carts");

        if (!savedCarts) {
            setCart([]);
            setCartLoaded(true);
            return;
        }

        try {
            const carts = JSON.parse(savedCarts);
            const userCart = carts[user.id];

            setCart(userCart || []);

        } catch (error) {
            setCart([]);
        }

        setCartLoaded(true);
    }, [user]);

    useEffect(() => {
        if (!user || !cartLoaded) {
            return;
        }

        const savedCarts = localStorage.getItem("carts");

        let carts = {};

        if (savedCarts) {
            try {
                carts = JSON.parse(savedCarts);
            } catch (error) {
                carts = {};
            }
        }

        carts[user.id] = cart;

        localStorage.setItem("carts", JSON.stringify(carts));

    }, [cart, user, cartLoaded]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;