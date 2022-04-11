using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence.Contracts
{
  public class ProductPersist : IProductPersist
  {
    private readonly ProductContext _context;

    public ProductPersist(ProductContext context)
    {
      _context = context;

    }
    public async Task<Product[]> GetAllProductsAsync()
    {
      IQueryable<Product> query = _context.Products.AsNoTracking()
                                                   .OrderBy(p => p.Name);

      return await query.ToArrayAsync();
    }

    public async Task<Product> GetProductByIdAsync(int productId)
    {
      IQueryable<Product> query = _context.Products.AsNoTracking()
                                                   .OrderBy(p => p.Id)
                                                   .Where(p => p.Id == productId);

      return await query.FirstOrDefaultAsync();
    }
  }
}