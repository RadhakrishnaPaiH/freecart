function usePagination({finalProducts, currentPage}) {

    const productsPerPage = 9;
    
    const startIndex = productsPerPage * (currentPage - 1);
    
    const endIndex = startIndex + productsPerPage;
    
    const paginatedProducts = finalProducts.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(finalProducts.length / productsPerPage);

    const pageBtn = Array.from({length: totalPages}, (_, index) => index + 1);

    return {totalPages, pageBtn, paginatedProducts}
}

export default usePagination