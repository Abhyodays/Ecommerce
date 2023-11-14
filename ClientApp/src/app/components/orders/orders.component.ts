import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProduct } from 'src/app/models/order-product.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  products: OrderProduct[] = [];
  token!: string | null;
  userMail!: string ;
  constructor(private orderService: OrderService, private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.authService.getTokenChange().subscribe((token: string | null) => {
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      this.userMail = decodedToken.email;
    })
    this.loadProducts();
  }
  loadProducts() {
    this.orderService.getOrders(this.userMail).subscribe({
      next: response => {
        this.products = response;
      },
      error: (err) => console.error(err)
    });
}
}
