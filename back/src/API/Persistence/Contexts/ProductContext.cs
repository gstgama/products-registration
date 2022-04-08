using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence
{

  public class ProductContext : DbContext
  {
    public ProductContext(DbContextOptions<ProductContext> options) : base(options) { }
    public DbSet<Product> Products { get; set; }
  }
}