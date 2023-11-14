using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.Models
{
    public class ApplicationUser:IdentityUser
    {
        [Required]
        [MaxLength(50)]
        [RegularExpression(@"^[A-Za-z\s]+$")]
        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$")]
        [MaxLength(10)]
        public string Phone { get; set; }

    }
}
