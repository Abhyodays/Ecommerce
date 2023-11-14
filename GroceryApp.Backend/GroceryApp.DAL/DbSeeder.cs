using GroceryApp.Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.DAL
{
    public class DbSeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DbSeeder(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedUsers()
        {
            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            var users = new List<ApplicationUser>
        {
            new ApplicationUser
            {
                UserName = "adminA@example.com",
                Email = "adminB@example.com",
                Name = "Admin A",
                Phone = "1234567890"
            },
            new ApplicationUser
            {
                UserName = "adminB@example.com",
                Email = "adminB@example.com",
                Name = "Admin B",
                Phone = "9876543210"
            },
            new ApplicationUser
            {
                UserName = "adminC@example.com",
                Email = "adminC@example.com",
                Name = "Admin C",
                Phone = "5555555555"
            }
        };
            foreach (var user in users)
            {
                var currentuser = await _userManager.FindByNameAsync(user.UserName);
                if(currentuser == null)
                {
                var result = await _userManager.CreateAsync(user, "DefaultPassword123!");
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
                }
            }

        }
    }
}
