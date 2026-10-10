function cancelOrder(orderId, userId, products, setProducts) {

    const savedOrders = localStorage.getItem("orders");

    if (!savedOrders) {
        return false;
    }

    const orders = JSON.parse(savedOrders);

    const userOrders = orders[userId] || [];

    const order = userOrders.find(
        order => order.id === orderId
    );

    if (!order) {
        return false;
    }

    if (
        order.status === "Shipped" ||
        order.status === "Out for Delivery" ||
        order.status === "Delivered" ||
        order.status === "Cancelled"
    ) {
        return false;
    }

    const updatedProducts = products.map(product => {

        const orderedItem = order.items.find(
            item => item.id === product.id
        );

        if (!orderedItem) {
            return product;
        }

        return {
            ...product,
            stock: product.stock + orderedItem.quantity
        };
    });

    setProducts(updatedProducts);

    const updatedOrders = {
        ...orders,
        [userId]: userOrders.map(order => {

            if (order.id === orderId) {
                return {
                    ...order,
                    status: "Cancelled"
                };
            }

            return order;
        })
    };

    localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
    );

    return true;
}

export default cancelOrder;