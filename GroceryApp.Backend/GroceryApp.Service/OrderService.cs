using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
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
        private List<OrderItemDTO> ConvertOrderItems(List<OrderItem> orders)
        {
            var items = new List<OrderItemDTO>();
            if (orders != null)
            {
                foreach (var item in orders)
                {
                    var orderDto = new OrderItemDTO()
                    {
                        userName = item.userName,
                        product = ConvertProduct(item.product),
                        orderedOn = item.orderedOn
                    };
                    items.Add(orderDto);
                }
            }
            return items;
        }
        private List<OrderItem> ConvertCartItems(List<OrderItemDTO> orders)
        {
            var items = new List<OrderItem>();
            if(orders != null)
            {
                foreach (var item in orders)
                {
                    var orderitem = new OrderItem()
                    {
                        userName = item.userName,
                        orderedOn = item.orderedOn,
                        productId = item.product.Id,
                        product = new Product()
                        {
                            Name = item.product.Name,
                            Description = item.product.Description,
                            Category = item.product.Category,
                            Quantity = item.product.Quantity,
                            Price = item.product.Price,
                            Discount = item.product.Discount,
                            Specifications = item.product.Specifications,
                            Image = Convert.FromBase64String(item.product.Image)
                        }
                };
                    items.Add(orderitem);
                }
            }
            return items;
        }
        public string AddOrder(List<OrderItemDTO> orders)
        {
            var orderItems = ConvertCartItems(orders);
            return _orderRepository.AddOrders(orderItems);
        }

        public List<OrderItemDTO> GetOrders(string userMail)
        {
            var orders = _orderRepository.GetOrders(userMail);
            return ConvertOrderItems(orders);
        }
    }
}
