using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Persistence;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductController : ControllerBase
  {
    private readonly ProductContext _context; //Tiar tudo que for camada de persistence
    public ProductController(ProductContext context)
    {
      _context = context;
    }

    public IEnumerable<Product> product = new Product[] {
        new Product(){
        Id = 1,
        Name = "Bateria",
        Category = "Office",
        Price = 33.12
      },
        new Product(){
          Id = 2,
          Name = "Bateria 2",
          Category = "Office 2",
          Price = 66.12
        }
      };

    [HttpGet]
    public IEnumerable<Product> GetAll()
    {
      return _context.Products;
    }

    [HttpGet("{id}")]
    public Product GetById(int id)
    {
      return _context.Products.FirstOrDefault(data => data.Id == id);
    }

  }
}
