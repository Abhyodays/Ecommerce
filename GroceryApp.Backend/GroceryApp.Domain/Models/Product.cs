using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required (ErrorMessage ="Name is required field.")]
        [MaxLength(100, ErrorMessage ="Maximum 100 Characters allowed.")]
       // [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Description is required field.")]
        [MaxLength(255, ErrorMessage = "Maximum 255 Characters allowed.")]
       // [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Category is required field.")]
        [MaxLength(100, ErrorMessage = "Maximum 100 Characters allowed.")]
        //[RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        public string Category { get; set; }
        [Required(ErrorMessage = "Quantity is required field.")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "Price is required field.")]
        public double Price { get; set; }
        public double? Discount{get; set; }
        //[RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        [MaxLength(100, ErrorMessage="Maximum 100 Characters allowed")]
        
        public string Specifications { get; set; }
        public byte[] Image { get; set; }

    }
}
