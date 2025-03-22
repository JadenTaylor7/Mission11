using Microsoft.EntityFrameworkCore;

namespace BookProject.API.Data
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options) 
        { }
        public DbSet<BookStore> Books { get; set; }
    }
}
