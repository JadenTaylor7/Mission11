import { useEffect, useState } from "react";
import {book} from "./types/book"
function BookList() {
    const [books, setBooks] = useState<book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const validTotalPages = isNaN(totalPages) || totalPages < 1 ? 1 : totalPages;
    useEffect(() => {
        const fetchBook = async() => {
            // const response = await fetch(`https://localhost:5000/api/water/allbooks?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
            //     credentials: 'include',
            // });
            const response = await fetch(`https://localhost:5000/api/BookStore/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}`);
            const data = await response.json();
            setBooks(data.bookList); //this has to be a lowercase p to match what gets returned
            setTotalItems(data.totalNumberbooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };




        fetchBook();
    }, [pageSize, pageNumber, totalItems]); //try, if don't work pass in empty array.








    return (
        <>
            <h1>Books Available</h1>
            {
                books?.map((i) => (
                    <div id="bookCard" className="card" key={i.bookID}>
                        <h3 className="card-title">{i.title}</h3>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li><strong>Author:</strong> {i.author}</li>
                                <li><strong>Publisher:</strong> {i.publisher}</li>
                                <li><strong>ISBN:</strong> {i.isbn}</li>
                                <li><strong>Classification:</strong> {i.classification}</li>
                                <li><strong>Category:</strong> {i.category}</li>
                                <li><strong>Page Count:</strong> {i.pageCount} pages</li>
                                <li><strong>Price:</strong> ${i.price}</li>
                            </ul>
                        </div>
       
                    </div>
                ))
            }
            <br/>


            <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>


            {/* dynamically create number of pages needed */}
            {[...Array(validTotalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNumber(i + 1)} disabled={pageNumber === (i + 1)}>
                    {i + 1}
                </button>
            ))} 
            {/* {
                [...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setPageNumber(i + 1)} disabled={pageNumber === (i + 1)}>
                        {i + 1}
                    </button>
                ))
            } */}


            <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
         
            <br/>
            <label>
                Results per page:
                <select value={pageSize} onChange={(i) => {
                    setPageSize(Number(i.target.value));
                    setPageNumber(1);
                    }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </label>
        </>
    );
}


export default BookList;


// function BookList() {

// }


// export default BookList