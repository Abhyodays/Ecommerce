import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
errors: string[] = []
productForm !: FormGroup;
product?: Product;
selectedImage!: string;
imageError:string="";
id!:number;
constructor(private router: Router, private route: ActivatedRoute,
  private formBuilder: FormBuilder, private productService: ProductService,
  private toastService:ToastService){}

ngOnInit():void{
    this.initializeForm();
    this.id=this.route.snapshot.params['id'];
    this.productService.getById(this.id).subscribe({
      next:(response)=>{
        this.product = response;
        if(this.product){
          this.productForm.patchValue({...this.product, image:""})
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
onImageSelected(event: any) {
  const file = event.target.files[0];
    if(!(file.type=="image/jpeg" || file.type=="image/png")){
      this.imageError = "Only .jpg and .png image format allowed";
      return;
    }
    else{
      this.imageError="";
    }
  this.convertToBase64(file).then(base64String => {
    this.selectedImage = base64String.split(',')[1];
  });
}

convertToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

editProduct(){
  if (this.productForm.invalid) {
    this.errors = [];
    if (this.productForm.get('name')?.hasError('required')) {
      this.errors.push('Name is required field');
    }
    if (this.productForm.get('description')?.hasError('required')) {
      this.errors.push('Description is required field');
    }
    if (this.productForm.get('category')?.hasError('required')) {
      this.errors.push('Category is required field');
    }
    if (this.productForm.get('quantity')?.hasError('required')) {
      this.errors.push('Quantity is required field');
    }
    if (this.productForm.get('price')?.hasError('required')) {
      this.errors.push('Price is required field');
    }
    if (this.productForm.get('image')?.hasError('required')) {
      this.errors.push('Image is required field');
    }

    if (this.productForm.get('name')?.hasError('pattern')) {
      this.errors.push('Only aphabets are allowed in Name field');
    }
    if (this.productForm.get('description')?.hasError('pattern')) {
      this.errors.push('Only aphabets are allowed in Description field');
    }
    if (this.productForm.get('category')?.hasError('pattern')) {
      this.errors.push('Only aphabets are allowed in Category field');
    }
    if (this.productForm.get('specification')?.hasError('pattern')) {
      this.errors.push('Only aphabets are allowed in Specification field');
    }
    if (this.productForm.get('quantity')?.hasError('pattern')) {
      this.errors.push('Only decimal values are allowed in Quantity field');
    }
    if (this.productForm.get('price')?.hasError('pattern')) {
      this.errors.push('Only decimal values are allowed in Price field');
    }
    console.log("Invalid");
    return;
  }
  this.errors = [];
  const product: Product = {
    name: this.productForm.value.name,
    description: this.productForm.value.description,
    category: this.productForm.value.category,
    quantity: Number(this.productForm.value.quantity),
    price: Number(this.productForm.value.price),
    discount: Number(this.productForm.value.discount),
    specifications: this.productForm.value.specifications,
    image: this.selectedImage,
    id: this.id
  };
  console.log("outside edit req: ", product);
  this.productService.edit(product).subscribe({
    next: (response) => {
      console.log("editing", response);
      this.productForm.reset();
      this.toastService.showSuccess("Product edited");
      this.router.navigate(['']);
    },
    error: (err) => {
      // let resErrors: any[] = err.error.model.Errors.errors;
      console.error(err);
      this.toastService.showError("Something went wrong");
      // resErrors.forEach(e => {
      //   this.errors.push(e.errorMessage);
      // })
    }
  })
}
initializeForm(){
  this.productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      category: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+([.]\d+)?$/)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+([.]\d+)?$/)]],
      discount: ['', [Validators.pattern(/^\d+([.]\d+)?$/)]],
      specifications: ['', [Validators.pattern(/^[A-Za-z0-9\s]*$/)]],
      image: [null, [Validators.required]],
  });
}
}


