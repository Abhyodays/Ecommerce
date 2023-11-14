using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryApp.DAL.Migrations
{
    public partial class modified_order_cart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItem_Products_productId",
                table: "CartItem");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Products_productId",
                table: "Orders");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItem_Products_productId",
                table: "CartItem",
                column: "productId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Products_productId",
                table: "Orders",
                column: "productId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItem_Products_productId",
                table: "CartItem");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Products_productId",
                table: "Orders");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItem_Products_productId",
                table: "CartItem",
                column: "productId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Products_productId",
                table: "Orders",
                column: "productId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
