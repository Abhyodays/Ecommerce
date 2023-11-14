using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Models
{
    public class CartItemDTO
    {
        public int Id { get; set; }
        public ProductDTO product { get; set; }
    }
}
