using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
using GroceryApp.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;
        public ProductController(IProductService service)
        {
            _service = service;
        }
        [HttpGet]
        [AllowAnonymous]
        public ActionResult Get([FromQuery]int page=1, [FromQuery]int items=1,[FromQuery]string searchKey="", [FromQuery]string category="")
        {
            var products = _service.GetProducts(page,items,searchKey,category);
            return Ok(new {products = products.Products, totalPages = products.TotalPages});
        }
       
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Product> Create(ProductDTO product)
        {
            Console.WriteLine(product);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var res = _service.Add(product);
            Console.WriteLine("inside controller:{0}", res);
            return Ok(res);
        }
        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var product = _service.GetById(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var res = _service.delete(id);
            if (res == "Failed")
            {
                return NotFound("Product not found");
            }
            return Ok(new { message = "deleted" });
        }
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public ActionResult<Product> Update(ProductDTO product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = _service.update(product);
            return Ok(res);
        }

    }
}
