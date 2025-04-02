import { useEffect, useState } from "react";
import {book} from "../types/book";
import { useNavigate } from "react-router-dom";
function BookList({ selectedCategories }: { selectedCategories: string[]}) {
    const [books, setBooks] = useState<book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("none"); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async() => {
            // const response = await fetch(`https://localhost:5000/api/water/allbooks?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
            //     credentials: 'include',
            // });
            const categoryParams = selectedCategories
                .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
                .join('&');
                
            const response = await fetch(`https://localhost:5000/api/BookStore/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumberBooks);
        

            let sortedBooks = data.bookList; //this has to be a lowercase p to match what gets returned

            // Sort books if sortOrder is set to A to Z or Z to A
            if (sortOrder === "A to Z") {
                sortedBooks = sortedBooks.sort((a: book, b: book) =>
                    a.title.localeCompare(b.title)
                );
            } else if (sortOrder === "Z to A") {
                sortedBooks = sortedBooks.sort((a: book, b: book) =>
                    b.title.localeCompare(a.title)
                );
            }

            setBooks(sortedBooks); // Set the sorted book list
            setTotalPages(Math.ceil(data.totalNumberBooks / pageSize));
        };

        fetchBook();
    }, [pageSize, pageNumber, sortOrder, selectedCategories]); //try, if don't work pass in default values



    return (
        <>
            <h1>Books Available</h1>
            <label>
                Sort by:
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="none">None</option>
                    <option value="A to Z">A to Z</option>
                    <option value="Z to A">Z to A</option>
                </select>
            </label>
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

                            <button className="btn btn-success" onClick={() => navigate(`/donate/${i.title}/${i.bookID}`)}>Checkout</button>
                        </div>
       
                    </div>
                ))
            }
            <br/>


            <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>


            {/* dynamically create number of pages needed */}
            {
                [...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setPageNumber(i + 1)} disabled={pageNumber === (i + 1)}>
                        {i + 1}
                    </button>
                ))
            }


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