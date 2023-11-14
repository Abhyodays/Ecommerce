using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Service
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _repository;
        public CartService(ICartRepository repository)
        {
            _repository = repository;
        }
        public static ProductDTO ConvertProduct(Product product)
        {
            if (product == null) return new ProductDTO();
            return new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Category = product.Category,
                Price = product.Price,
                Quantity = product.Quantity,
                Discount = product.Discount,
                Specifications = product.Specifications,
                Image = product.Image != null ? Convert.ToBase64String(product.Image) : null
            };
        }
        private List<CartItemDTO> ConvertCartItems(List<CartItem> cartItems)
        {
            var items = new List<CartItemDTO>();
            if (cartItems != null)
            {
                foreach(var item in cartItems)
                {
                    var cartItemDto = new CartItemDTO()
                    {
                        Id = item.Id,
                        product = ConvertProduct(item.product)
                    };
                    items.Add(cartItemDto);
                }
            }
            return items;
        }
        public List<CartItemDTO> GetCartItems(string userMail)
        {
            var carItems = _repository.GetCartItems(userMail);
            return ConvertCartItems(carItems);
        }

        public string InsertCartItem(string userMail, int productId)
        {
            return _repository.InsertCartItem(userMail, productId);
        }

        public string RemoveCartItem(string userMail, int productId)
        {
            return _repository.RemoveCartItem(userMail, productId);
        }
        public string RemoveAllCartItems(string userMail)
        {
            return _repository.RemoveAllCartItems(userMail);
        }
    }
}
