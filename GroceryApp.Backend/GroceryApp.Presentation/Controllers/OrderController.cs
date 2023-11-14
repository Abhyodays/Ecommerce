using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("{userMail}")]
        public List<OrderItemDTO> GetOrders(string userMail)
        {
            return _orderService.GetOrders(userMail);
        }
        [HttpPost("addOrders")]
        public IActionResult AddOrders(List<OrderItemDTO> orders)
        {
            var res =  _orderService.AddOrder(orders);
            if (res == "success")
            {
                return Ok(new { message = "Ordered" });
            }
            return BadRequest(new { message = res });
        }
    }
}
