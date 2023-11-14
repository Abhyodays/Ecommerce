using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Interfaces
{
    public interface ICartRepository
    {
        public List<CartItem> GetCartItems(string userMail);
        public string InsertCartItem(string userMail, int productId);
        public string RemoveCartItem(string userMail, int productId);
        public string RemoveAllCartItems(string userMail);
    }
}
