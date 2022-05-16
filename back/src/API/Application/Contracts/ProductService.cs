using System;
using System.Threading.Tasks;
using API.Models;
using AutoMapper;
using API.Persistence.Contracts;

namespace API.Application.Contracts
{
  public class ProductService : IProductService
  {
    private readonly IProductPersist _productPersist;
    private readonly IGeneralPersist _generalPersist;
    private readonly IMapper _mapper;
    public ProductService(IProductPersist productPersist, IGeneralPersist generalPersist, IMapper mapper)
    {
      _generalPersist = generalPersist;
      _productPersist = productPersist;
      _mapper = mapper;
    }

    public async Task<Product> AddProduct(Product model)
    {
      try
      {
        _generalPersist.Add<Product>(model);

        if (await _generalPersist.SaveChangesAsync())
        {
          var productReturn = await _productPersist.GetProductByIdAsync(model.Id);

          return productReturn;
        }
        return null;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<Product> UpdateProduct(int productId, Product model)
    {
      try
      {
        var product = await _productPersist.GetProductByIdAsync(productId);
        if(product == null) return null;

        model.Id = product.Id;

        _generalPersist.Update<Product>(model);

        if(await _generalPersist.SaveChangesAsync())
        {
          return await _productPersist.GetProductByIdAsync(productId);
        }

        return null;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }
    public async Task<bool> DeleteProduct(int productId)
    {
      try
      {
        var product = await _productPersist.GetProductByIdAsync(productId);
        if (product == null) throw new Exception("Product for delete was not found.");

        _generalPersist.Delete<Product>(product);
        return await _generalPersist.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }
    public async Task<Product[]> GetAllProductsAsync()
    {
      try
      {
        var products = await _productPersist.GetAllProductsAsync();
        if (products == null) return null;

        return products;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<Product> GetProductByIdAsync(int productId)
    {
      try
      {
        var product = await _productPersist.GetProductByIdAsync(productId);
        if (product == null) return null;

        return product;

      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }
  }
}