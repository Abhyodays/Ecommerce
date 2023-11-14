import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { AddComponentComponent } from './components/add-component/add-component.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path:'',
    component:ProductsComponent,
    title:'Grocery App | Home'
  },
  {
    path:'signup',
    component:SignUpComponent,
    title:'Grocery App | Signup'
  },
  {
    path:'login',
    component: LoginComponent,
    title:'Grocery App | Login'
  },
  {
    path:'product/add',
    component:AddComponentComponent,
    title:'Grocery App | Add Product'
  },
  {
    path:'product/:id',
    component:ProductDetailComponent,
    title:'Grocery App | Details'
  },
  {
    path:'product/edit/:id',
    component: EditProductComponent,
    title: 'Grocery App | Edit'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Grocery App | Cart'
  },
  {
    path: 'orders',
    component: OrdersComponent,
    title: 'Grocery App | My Orders'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
