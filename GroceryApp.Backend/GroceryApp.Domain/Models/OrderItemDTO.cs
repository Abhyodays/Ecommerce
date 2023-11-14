using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Models
{
    public class OrderItemDTO
    {
        public string userName { get; set; }
        public ProductDTO product { get; set; }
        public string orderedOn { get; set; }
    }
}
