using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.DAL
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context) 
        {
            _context = context;
              
        }
        public ProductPagination GetProducts(int page, int items,string searchKey, string category)
        {
            int itemsToSkip = (page - 1) * items;
            var products = new List<Product>();
            int totalProducts = _context.Products.Count();
            if (string.IsNullOrEmpty(searchKey) && string.IsNullOrEmpty(category))
            {
                products =  _context.Products.Skip(itemsToSkip).Take(items).ToList();
            }
            else if(!string.IsNullOrEmpty(searchKey) && string.IsNullOrEmpty(category))
            {
                var allProducts = _context.Products.Where(product => product.Name.ToLower().Contains(searchKey.ToLower()) ||
               product.Description.ToLower().Contains(searchKey.ToLower()));
                totalProducts = allProducts.Count();
                products =allProducts.Skip(itemsToSkip).Take(items).ToList();
            }
            else if(string.IsNullOrEmpty(searchKey) && !string.IsNullOrEmpty(category))
            {
                var allProducts = _context.Products.Where(product => product.Category == category);
                totalProducts = allProducts.Count();
                products = allProducts.Skip(itemsToSkip).Take(items).ToList(); 
            }
            else
            {
                var allProducts = _context.Products.Where(product => product.Category == category && (product.Name.ToLower().Contains(searchKey.ToLower()) ||
                 product.Description.ToLower().Contains(searchKey.ToLower())));
                totalProducts = allProducts.Count();
                products = allProducts.Skip(itemsToSkip).Take(items).ToList(); 
            }
            return new ProductPagination
            {
                Products = products,
                TotalPages = (int)Math.Ceiling(totalProducts / (double)items)
            };
        }
        public Product Add(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        public Product GetById(int id)
        {
            return _context.Products.FirstOrDefault(p => p.Id == id);
        }
        public string Delete(int id)
        {
            var productToDelete = _context.Products.FirstOrDefault(p => p.Id == id) ;
            if (productToDelete != null)
            {
                _context.Products.Remove(productToDelete);
                _context.SaveChanges();
                return "Deleted";
            }
            return "Failed";
        }

        public Product Update(Product product)
        {
            var updateProduct = _context.Products.FirstOrDefault(p => p.Id == product.Id);
            if (updateProduct != null)
            {    
                updateProduct.Name = product.Name;
                updateProduct.Price = product.Price;
                updateProduct.Quantity = product.Quantity;
                updateProduct.Image = product.Image;
                updateProduct.Specifications = product.Specifications;
                updateProduct.Discount = product.Discount;
                updateProduct.Category = product.Category;
                updateProduct.Description = product.Description;
                _context.SaveChanges();
                Console.WriteLine("Inside Product repo: {0}", updateProduct);
            }
            return updateProduct;
        }
       
    }
}
