const fetchProducts = async () => {
    try{
        const response = await fetch("https://fakestoreapi.com/products");

        if(!response.ok){
            throw new Error("Fetch Not Possible!")
        }
            
        const data = await response.json();

        return data;
    }catch(error){
        throw error;
    }
}

export default fetchProducts;