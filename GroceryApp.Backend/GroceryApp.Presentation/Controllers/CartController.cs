using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryApp.Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _service;
        public CartController(ICartService service)
        {
            _service = service;
        }
        [HttpGet("{userMail}")]
        [Authorize]
        public ActionResult<List<CartItemDTO>> GetCartItems(string userMail)
        {
            return _service.GetCartItems(userMail); 
        }

        [HttpPost("{userMail}")]
        [Authorize]
        public IActionResult InsertItem(string userMail,[FromBody]int productId)
        {
            var res = _service.InsertCartItem(userMail, productId);
            if (res == "failed")
            {
                return BadRequest(new { message = "Item insertion in cart failed" });
            }
            return Ok(new { message = "Insertion succesful" });
        }
        [HttpDelete("{userMail}/{productId}")]
        [Authorize]
        public IActionResult RemoveItem(string userMail, int productId)
        {
            var res = _service.RemoveCartItem(userMail, productId);
            if (res == "failed")
            {
                return BadRequest(new { message = "Item removal from cart failed" });
            }
            return Ok(new { message = "Removal successful" });
        }


        [HttpDelete("{userMail}")]
        [Authorize]
        public IActionResult RemoveAllCartItems(string userMail)
        {
            var res = _service.RemoveAllCartItems(userMail);
            if (res == "failed")
            {
                return BadRequest(new { message = "Item removal from cart failed" });
            }
            return Ok(new { message = "Removal successful" });
        }
    }
}
