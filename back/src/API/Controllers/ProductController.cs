﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Application.Contracts;

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
