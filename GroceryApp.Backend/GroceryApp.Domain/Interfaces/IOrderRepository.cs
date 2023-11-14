using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Interfaces
{
    public interface IOrderRepository
    {
        public List<OrderItem> GetOrders(string userMail);
        public string AddOrders(List<OrderItem> orders);
    }
}
