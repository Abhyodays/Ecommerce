using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Interfaces
{
    public interface IProductService
    {
        public ProductPaginationDTO GetProducts(int page, int items,string searchKey, string category);
        public Product Add(ProductDTO product);
        public ProductDTO GetById(int id);
        public string delete(int id);
        public ProductDTO update(ProductDTO product);
    }
}
