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
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;
        private readonly IProductRepository _productRepository;
        public CartRepository(AppDbContext context, IProductRepository productRepository)
        {
            _context = context;
            _productRepository = productRepository;
        }
        public List<CartItem> GetCartItems(string userMail)
        {
            var cart = _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.product)
                .FirstOrDefault(c => c.userName == userMail);

            if (cart != null)
            {
                if (cart.CartItems.Count == 0)
                {
                    Console.WriteLine("Cart is Empty");
                }

                return cart.CartItems;
            }

            return new List<CartItem>();
        }


        public string InsertCartItem(string userMail, int productId)
        {
            var product = _productRepository.GetById(productId);
            var cart = _context.Carts
               .Include(c => c.CartItems)
               .ThenInclude(ci => ci.product)
               .FirstOrDefault(c => c.userName == userMail);

            if (product == null)
            {
                return "failed";
            }

            if (cart == null)
            {
                var newCart = new Cart()
                {
                    userName = userMail,
                    CartItems = new List<CartItem>(),
                };
                _context.Carts.Add(newCart);
                _context.SaveChanges();

                cart = newCart; 

            }

            cart = _context.Carts
               .Include(c => c.CartItems)
               .ThenInclude(ci => ci.product)
               .FirstOrDefault(c => c.userName == userMail);
            var isItemInCart = cart.CartItems.FirstOrDefault(ci => ci.product.Id == productId);

            if (isItemInCart == null)
            {
                var cartItem = new CartItem()
                {
                    product = product
                };

                cart.CartItems.Add(cartItem);
                _context.SaveChanges();
                return "success";
            }

            return "failed";
        }


        public string RemoveCartItem(string userMail, int productId)
        {
            var cart = _context.Carts
               .Include(c => c.CartItems)
               .ThenInclude(ci => ci.product)
               .FirstOrDefault(c => c.userName == userMail);
            if (cart!= null)
            {
                var cartItem = cart.CartItems.FirstOrDefault(ci => ci.product.Id == productId);
                if (cartItem != null)
                {
                    cart.CartItems.Remove(cartItem);
                    _context.SaveChanges();
                    return "success";
                }
            }
            return "failed";
        }

        public string RemoveAllCartItems(string userMail)
        {
            var cart = _context.Carts
               .Include(c => c.CartItems)
               .ThenInclude(ci => ci.product)
               .FirstOrDefault(c => c.userName == userMail);
            if(cart != null)
            {
                cart.CartItems.Clear();
                _context.SaveChanges();
                return "success";
            }
            return "failed";
        }
    }
}
