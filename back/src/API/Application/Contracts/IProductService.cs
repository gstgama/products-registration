using System.Threading.Tasks;
using API.Models;

namespace API.Application.Contracts
{
  public interface IProductService
  {
    Task<Product> AddProduct(Product model);
    Task<bool> DeleteProduct(int productId);
    Task<Product[]> GetAllProductsAsync();
    Task<Product> GetProductByIdAsync(int productId);
  }
}