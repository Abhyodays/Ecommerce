using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Interfaces
{
    public interface IOrderService
    {
        public List<OrderItemDTO> GetOrders(string userMail);
        public string AddOrder(List<OrderItemDTO> orders);
    }
}
