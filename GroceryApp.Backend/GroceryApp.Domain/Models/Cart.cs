using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Models
{
    public class Cart
    {
        public List<CartItem> CartItems { get; set; } = new();
        [Key]
        public string userName { get; set; }
    }
}
