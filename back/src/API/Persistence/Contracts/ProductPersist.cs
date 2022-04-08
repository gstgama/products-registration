using System.Threading.Tasks;
using API.Models;

namespace API.Persistence.Contracts
{
  public class ProductPersist : IProductPersist
  {
    private readonly ProductContext context;

    public ProductPersist(ProductContext _context)
    {
      context = _context;

    }
    public Task<Product[]> GetAllProductsAsync()
    {

    }
  }
}