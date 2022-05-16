using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Application.Contracts;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductController : ControllerBase
  {
    private readonly IProductService _productService;
    public ProductController(IProductService productService)
    {
      _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      try
      {
        var products = await _productService.GetAllProductsAsync();
        if (products == null) return NoContent();

        return Ok(products);
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      try
      {
        var product = await _productService.GetProductByIdAsync(id);
        if(product == null) return NoContent();

        return Ok(product);
      }
      catch (Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to catch the product. Error: {ex.Message}");
      }
    }

    [HttpPost]
    public async Task<IActionResult> Post(Product model)
    {
      try
      {
        var product = await _productService.AddProduct(model);
        if (product == null) return NoContent();

        return Ok(product);
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Product model)
    {
      try
      {
        var product = await _productService.UpdateProduct(id, model);
        if(product == null) return NoContent();

        return Ok(product);
      }
      catch (Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tetnar atualizar evento. Erro: {ex}");
      }
    }

    [HttpDelete("{productId}")]
    public async Task<IActionResult> Delete(int productId)
    {
      try
      {
        var product = await _productService.GetProductByIdAsync(productId);
        if (product == null) return NoContent();

        return await _productService.DeleteProduct(productId)
        ? Ok(new { message = "Product has been deleted." })
        : throw new Exception("An unespecified error ocurred trying to delete this product.");


      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }
  }
}
