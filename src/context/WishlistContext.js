import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

// Create a context to share wishlist data with other components
export const WishlistContext = createContext();

function WishlistProvider({ children }) {

    // Get the currently logged-in user from UserContext
    const { user } = useContext(UserContext);

    // Store the current user's wishlist in state
    const [wishlist, setWishlist] = useState([]);

    // Keeps track of whether the user's wishlist has finished loading
    const [wishlistLoaded, setWishlistLoaded] = useState(false);

    // Load the wishlist whenever the logged-in user changes
    useEffect(() => {
        // The wishlist needs to be loaded again whenever the user changes
        setWishlistLoaded(false);

        // If nobody is logged in, keep the wishlist empty
        if (!user) {
            setWishlist([]);

            // Loading is complete even though there is no logged-in user
            setWishlistLoaded(true);

            return;
        }

        // Get all users' wishlists from Local Storage
        const savedWishlists = localStorage.getItem("wishlists");

        // If no wishlists have been saved yet, start with an empty wishlist
        if (!savedWishlists) {
            setWishlist([]);

            // There was nothing to load, so loading is complete
            setWishlistLoaded(true);

            return;
        }

        try {
            // Convert the saved JSON string back into a JavaScript object
            const wishlists = JSON.parse(savedWishlists);

            // Get only the wishlist belonging to the currently logged-in user
            const userWishlist = wishlists[user.id];

            // Put that user's wishlist into React state
            // If the user has no wishlist yet, use an empty array
            setWishlist(userWishlist || []);

            // Tell the saving effect that the wishlist has finished loading
            setWishlistLoaded(true);

        } catch (error) {

            // If the saved Local Storage data is invalid,
            // use an empty wishlist instead of crashing the app
            setWishlist([]);

            // Loading is complete even though the saved data was invalid
            setWishlistLoaded(true);
        }

    }, [user]);


    // Save the current user's wishlist whenever it changes
    useEffect(() => {

        // Do not save anything when no user is logged in
        if (!user) {
            return;
        }

        // Don't save until the user's existing wishlist has finished loading
        if (!wishlistLoaded) {
            return;
        }

        // Get the existing wishlists of all users
        const savedWishlists = localStorage.getItem("wishlists");

        // Start with an empty object if no wishlists exist
        let wishlists = {};

        if (savedWishlists) {
            try {
                // Convert the saved JSON string into a JavaScript object
                wishlists = JSON.parse(savedWishlists);

            } catch (error) {

                // If the saved data is invalid,
                // start again with an empty object
                wishlists = {};
            }
        }

        // Store this user's wishlist using their unique user ID
        wishlists[user.id] = wishlist;

        // Convert the object into a JSON string and save it in Local Storage
        localStorage.setItem("wishlists", JSON.stringify(wishlists));

    }, [wishlist, user, wishlistLoaded]);


    // Make wishlist and setWishlist available to components through Context
    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistProvider;