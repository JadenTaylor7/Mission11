using BookProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        private StoreDbContext _storeContext;
        public BookStoreController(StoreDbContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize, int pageNumber, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _storeContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any()) 
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            var totalNumberBooks = query.Count();



            var bookList = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize).ToList();

            // var passedObject = new
            // {
            //     Books = bookList,
            //     TotalNumBooks = totalNumberBooks
            // };

            return Ok(new
            {
                bookList,
                totalNumberBooks
            });
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes ()
        {
            var bookTypes = _storeContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }



        //IEnumerable is just a fast iterating list
        [HttpGet("GetFeisty")]
        public IEnumerable<BookStore> GetFiesty()
        {
            var bookList = _storeContext.Books.ToList();

            return bookList;
        }



        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] BookStore newBook)
        {
            _storeContext.Books.Add(newBook);
            _storeContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] BookStore updatedBook)
        {
            var existingBook = _storeContext.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _storeContext.Books.Update(existingBook);
            _storeContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _storeContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _storeContext.Books.Remove(book);
            _storeContext.SaveChanges();

            return NoContent();
        }

    }
}
