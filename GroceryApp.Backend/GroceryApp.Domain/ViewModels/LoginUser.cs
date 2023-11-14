﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.Domain.ViewModels
{
    public class LoginUser
    {

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email{ get; set; }
        [Required]
        public string Password { get; set; }
    }
}
