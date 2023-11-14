using GroceryApp.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DummyProductController : ControllerBase
    {
        private readonly IDummyProductService _service;
        public DummyProductController(IDummyProductService service)
        {
            _service = service;
        }
        [HttpGet]
        public double Get()
        {
            return _service.GetAverageProductPrice();
        }
    }
}
