function Pagination({currentPage, totalPages, pageBtn, onPageChange}) {
  return (
    <div className="pagination-wrapper">
        { totalPages > 1 && (
            <div className="pagination">
                <button 
                    className="pagination-button"
                    disabled={currentPage === 1} 
                    onClick={() => {
                        const prevPage = currentPage - 1;
                        onPageChange(prevPage);
                    }}
                >Prev</button>

                {pageBtn.map((number) => (
                    <button
                        className={`pagination-button ${currentPage === number ? "pagination-active" : ""}`}
                        key={number} 
                        onClick={() => {
                        onPageChange(number);
                        }}
                    >
                        {number}
                    </button>
                ))}

                <button 
                    className="pagination-button"
                    disabled={currentPage === totalPages} 
                    onClick={() => {
                        const nextPage = currentPage + 1;
                        onPageChange(nextPage);
                    }}
                >Next</button>
            </div>
        )}
    </div>
  )
}

export default Pagination