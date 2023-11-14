using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Models
{
    public class ProductPaginationDTO
    {
        public List<ProductDTO> Products { get; set; }
        public int TotalPages { get; set; }
    }
}
