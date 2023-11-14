using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.DAL.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        public string AddOrders(List<OrderItem> orders)
        {
            try
            {
                foreach (var order in orders)
                {
                    var existingProduct = _context.Products.Find(order.productId);
                    if (existingProduct != null)
                    {
                        order.product = existingProduct;
                        _context.Orders.Add(order);
                    }
                    else
                    {
                        return "Product does not exist";
                    }
                }
                _context.SaveChanges();

                return "success";
            }
            catch (Exception ex)
            {
                return $"Error occurred while adding orders: {ex.Message}";
            }
        }

        public List<OrderItem> GetOrders(string userName)
        {
            return _context.Orders
                .Where(o => o.userName == userName && o.product != null)
                .Include(o => o.product)
                .ToList();
        }

    }
}
