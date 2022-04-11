using System.Threading.Tasks;
using API.Models;

namespace API.Persistence.Contracts
{
  public interface IProductPersist
  {
    Task<Product[]> GetAllProductsAsync();

    Task<Product> GetProductByIdAsync(int productId);
  }
}