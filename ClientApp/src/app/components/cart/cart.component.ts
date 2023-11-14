import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cart-product.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: CartProduct[] = [];
  token!: string | null;
  userMail!: string ;
  constructor(private cartService: CartService,
    private router: Router, private authService: AuthService,
    private orderService: OrderService, private toastService:ToastService) { }
  ngOnInit() {
    this.authService.getTokenChange().subscribe((token: string | null) => {
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      this.userMail = decodedToken.email;
    })
    this.loadProducts();
  }
  loadProducts() {
      this.cartService.getCartItems(this.userMail).subscribe({
        next: response => {
          this.products = response;
          console.log("inside cart load product:", response);
        },
        error: (err) => console.error(err)
      });
  }
  getDiscoutPercentage(product: Product) {
    return (((product.discount ?? 0) / product.price) * 100).toFixed();
  }
  order() {
    this.orderService.AddOrders(this.userMail,this.products).subscribe({
      next: response =>{
        this.toastService.showSuccess("Ordered successfully")
        this.removeAllItems();
      },
      error: err => {
        console.error(err);
        this.toastService.showError("Something went wrong");
      }
    })
    //this.router.navigate(['orders'])
  }
  removeItem(productId:number){
    this.cartService.removeItem(this.userMail, productId).subscribe({
      next: response => {
        this.toastService.showWarning("Product removed from cart")
        this.loadProducts();
      },
      error: err => {
        this.toastService.showError("Something went wrong");
        console.log(err);   
      }
    })
  }

  removeAllItems(){
    this.cartService.removeAllItems(this.userMail).subscribe({
      next: response =>{
        console.log("removing items from cart...",response);
        this.loadProducts();
      },
      error: err => console.error(err)
    })
  }
}
