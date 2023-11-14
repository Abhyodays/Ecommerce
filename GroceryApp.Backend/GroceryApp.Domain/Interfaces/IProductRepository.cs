using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Interfaces
{
    public interface IProductRepository
    {
        public ProductPagination GetProducts(int page, int items, string searchKey, string category);
        public Product Add(Product product);
        public Product GetById(int id);
        public string Delete(int id);
        public Product Update(Product product);
    }
}
