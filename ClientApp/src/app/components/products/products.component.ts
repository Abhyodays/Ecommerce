import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  searchKeyword: string = '';
  filteredProducts: any[] = [];
  products: any[] = [];
  categories: string[] = [];
  service = inject(ProductService);
  token!: string | null;
  role = "User";
  selectedCategory = '';
  selectedSortOption = '';
  currentPage: number = 1; 
  itemsPerPage: number = 3;
  totalPages = 1;

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService,
    private eventService: EventService) { }
  ngOnInit() {
    this.loadProducts();
    this.authService.getTokenChange().subscribe((token: string | null) => {
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      this.role = decodedToken.role;
    });
    this.eventService.gotoHome.subscribe(()=>{
      this.resetSearch();
    }
    )
  }
  loadProducts() {
    this.service.getProducts(this.currentPage, this.itemsPerPage,
    this.searchKeyword, this.selectedCategory).subscribe({
      next: response => {
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.filteredProducts = this.products;
        this.extractCategories();
      },
      error: (err) => console.error(err)
    });
  }

  openProductDetail(id: number) {
    this.router.navigate(['/product', id]);
  }
  isLoggedIn(): boolean {
    return !!this.token;
  }
  delete(id: number) {
    this.service.delete(id).subscribe({
      next: response => {
        this.loadProducts();
        this.toastService.showSuccess("Product deleted successfully");
      },
      error: err => {
        console.log(err);
        this.toastService.showError("Something went wrong");
      }
    });
  }
  edit(id: number) {
    this.router.navigate(['/product/edit/' + id]);
  }
  extractCategories() {
    const uniqueCategories = [...new Set(this.products.map(product => product.category))];
    this.categories = uniqueCategories;
  }
  sortProducts() {
    switch (this.selectedSortOption) {
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'priceUp':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDown':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }
  filterProducts(){
    this.currentPage = 1;
    this.loadProducts();
  }
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }
  resetSearch(){
    this.searchKeyword='';
    this.selectedCategory='';
    this.loadProducts();
  }
  
}
