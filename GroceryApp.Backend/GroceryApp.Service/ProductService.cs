using GroceryApp.Domain.Interfaces;
using GroceryApp.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Service
{
    public class ProductService: IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public static ProductDTO ConvertProduct(Product product)
        {
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
        private List<ProductDTO> ConvertProducts(List<Product> products)
        {
            List<ProductDTO> productDTOs = new List<ProductDTO>();

            if (products != null)
            {
                foreach (var product in products)
                {
                    if(product != null)
                    {
                        var productDTO = ConvertProduct(product);
                        productDTOs.Add(productDTO);
                    }
                }
            }

            return productDTOs;
        }
        public ProductPaginationDTO GetProducts(int page, int items,string searchKey,string category)
        {
            var productPagination = _repository.GetProducts(page,items,searchKey,category);
            return new ProductPaginationDTO
            {
                Products = ConvertProducts(productPagination.Products),
                TotalPages = productPagination.TotalPages
            };
        }
                
        public Product Add(ProductDTO product)
        {
            var modifiedProduct = new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Category = product.Category,
                Quantity = product.Quantity,
                Price = product.Price,
                Discount = product.Discount,
                Specifications = product.Specifications,
                Image = Convert.FromBase64String(product.Image)
            };
            return _repository.Add(modifiedProduct);
        }
        public ProductDTO GetById(int id)
        {
            return ConvertProduct(_repository.GetById(id));
        }

        public string delete(int id)
        {
            return _repository.Delete(id);
        }
        public ProductDTO update(ProductDTO product)
        {
            var modifiedProduct = new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Category = product.Category,
                Quantity = product.Quantity,
                Price = product.Price,
                Discount = product.Discount,
                Specifications = product.Specifications,
                Image = Convert.FromBase64String(product.Image),
                Id = product.Id
            };
            var res =  _repository.Update(modifiedProduct);
            return ConvertProduct(res);
        }
    }
}
