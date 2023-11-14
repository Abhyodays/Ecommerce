import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
 product!: Product;
 Off:string="0";
 price!:number;
 token!: string | null;
 userMail!: string ;
 role = "User"
 constructor(private productService: ProductService,private route: ActivatedRoute,
  private cartService: CartService, private authService:AuthService,
  private toastService:ToastService){}
 ngOnInit(){
  this.authService.getTokenChange().subscribe((token: string | null) => {
    this.token = token;
    const decodedToken = this.authService.decodedToken(this.token);
    this.userMail = decodedToken.email;
    this.role = decodedToken.role;
  })
  this.route.params.subscribe({
    next: (params)=>{
      const id = +params['id'];
      this.productService.getById(id).subscribe({
        next:(response)=>{
          this.product = response;
          this.price = this.product.price;
          if(this.product.discount){
            this.Off = ((this.product.discount/this.product.price)*100).toFixed();
            this.price = this.price-this.product.discount;
          }
        }
      })
    }
  });
 }
AddToCart(productId:number){
  this.cartService.insertItem(this.userMail, productId).subscribe({
    next: response =>{
      this.toastService.showSuccess("Product Added to Cart!")
    },
    error: err => {
      console.error(err);
      this.toastService.showSuccess("Something went wrong!")
    }
  });
}
isLoggedIn(){
  return this.authService.isAuthenticated();
}
}
