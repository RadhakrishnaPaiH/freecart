import { useMemo } from "react";

function useProductFilters({
    products,
    catFilter,
    sortFilter,
    search
}) {
    const finalProducts = useMemo(() => {
    
        const filteredProducts = 
            catFilter === "all"
                ? products
                : products.filter(product => product.category === catFilter);
    
        const items = [...filteredProducts];
    
        const sortedProducts = items.sort((a,b) => {
            switch (sortFilter) {
                case "lowhigh":
                    return a.price - b.price;
                case "highlow":
                    return b.price - a.price;
                case "az":
                    return a.title.localeCompare(b.title);
                case "za":
                    return b.title.localeCompare(a.title);
                case "all":
                default:
                    return 0;
            }
        });
    
        return sortedProducts.filter((product) => 
            product.title.toLowerCase().includes(search.toLowerCase())
        );
    },[products, catFilter, sortFilter, search]);

  return {finalProducts}
}

export default useProductFilters;