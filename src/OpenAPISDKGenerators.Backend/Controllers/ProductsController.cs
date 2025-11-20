using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc;

namespace OpenAPISDKGenerators.Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly ConcurrentBag<Product> _products = InitializeProducts();

    public static ConcurrentBag<Product> InitializeProducts()
    {
        return
        [
            new Product()
            {
                Id = Guid.CreateVersion7(),
                Title = "Mobile Phone",
                Price = 55 * 1000,
                Description = "Mobile Phone Description",
            },
            new Product()
            {
                Id = Guid.CreateVersion7(),
                Title = "Laptop",
                Price = 120 * 1000,
                Description = "Laptop Description",
            },
        ];
    }

    [HttpGet(Name = "GetProducts")] // You need to specify the name to be used in the OpenAPI spec as OperationId
    public ActionResult<List<Product>> GetProducts()
    {
        return Ok(_products);
    }

    [HttpPost(Name = "CreateProduct")]
    public ActionResult<Product> CreateProduct(Product product)
    {
        _products.Add(product);
        return CreatedAtAction(nameof(GetProducts), product);
    }
}
