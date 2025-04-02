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

        // [HttpGet("AllBooks")]
        // public IActionResult GetBooks(int pageSize, int pageNumber)
        // {

        //     var bookList = _storeContext.Books
        //         .Skip((pageNumber - 1) * pageSize)
        //         .Take(pageSize).ToList();

        //     var totalNumberBooks = _storeContext.Books.Count();

        //     return Ok(new
        //     {
        //         bookList,
        //         totalNumberBooks
        //     });
        // }



        //IEnumerable is just a fast iterating list
        [HttpGet("GetFeisty")]
        public IEnumerable<BookStore> GetFiesty()
        {
            var bookList = _storeContext.Books.ToList();

            return bookList;
        }
    }
}
