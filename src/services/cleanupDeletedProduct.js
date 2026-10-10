const cleanupDeletedProduct = (productId) => {
    const savedCarts = localStorage.getItem("carts");

    if (!savedCarts) {
        return;
    }

    let carts;

    try {
        carts = JSON.parse(savedCarts);
    } catch (error) {
        return;
    }

    Object.keys(carts).forEach((userId) => {
        carts[userId] = carts[userId].filter(
            item => item.id !== productId
        );
    });

    localStorage.setItem("carts", JSON.stringify(carts));
    

    const savedWishlists = localStorage.getItem("wishlists");

    if (savedWishlists) {
        let wishlists;

        try {
            wishlists = JSON.parse(savedWishlists);
        } catch (error) {
            return;
        }

        Object.keys(wishlists).forEach((userId) => {
            wishlists[userId] = wishlists[userId].filter(
                item => item.id !== productId
            );
        });

        localStorage.setItem(
            "wishlists",
            JSON.stringify(wishlists)
        );
    }
};

export default cleanupDeletedProduct;