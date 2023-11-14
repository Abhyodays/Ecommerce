import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent {
  errors: string[] = [];
  AddProductForm: FormGroup;
  selectedImage!: string;
  imageError:string = ""
  constructor(private formBuilder: FormBuilder, private service: ProductService,
     private router: Router, private toastService:ToastService) {
    this.AddProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      category: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+([.]\d+)?$/)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+([.]\d+)?$/)]],
      discount: ['', [Validators.pattern(/^\d+([.]\d+)?$/)]],
      specification: ['', [Validators.pattern(/^[A-Za-z0-9\s]*$/)]],
      image: [null, [Validators.required]],
    });
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
  Submit() {
    if (this.AddProductForm.invalid) {
      this.errors = [];
      if (this.AddProductForm.get('name')?.hasError('required')) {
        this.errors.push('Name is required field');
      }
      if (this.AddProductForm.get('description')?.hasError('required')) {
        this.errors.push('Description is required field');
      }
      if (this.AddProductForm.get('category')?.hasError('required')) {
        this.errors.push('Category is required field');
      }
      if (this.AddProductForm.get('quantity')?.hasError('required')) {
        this.errors.push('Quantity is required field');
      }
      if (this.AddProductForm.get('price')?.hasError('required')) {
        this.errors.push('Price is required field');
      }
      if (this.AddProductForm.get('image')?.hasError('required')) {
        this.errors.push('Image is required field');
      }

      if (this.AddProductForm.get('name')?.hasError('pattern')) {
        this.errors.push('Only aphabets and numbers are allowed in Name field');
      }
      if (this.AddProductForm.get('description')?.hasError('pattern')) {
        this.errors.push('Only aphabets and numbers are allowed in Description field');
      }
      if (this.AddProductForm.get('category')?.hasError('pattern')) {
        this.errors.push('Only aphabets and numbers are allowed in Category field');
      }
      if (this.AddProductForm.get('specification')?.hasError('pattern')) {
        this.errors.push('Only aphabet and numbers are allowed in Specification field');
      }
      if (this.AddProductForm.get('quantity')?.hasError('pattern')) {
        this.errors.push('Only decimal values are allowed in Quantity field');
      }
      if (this.AddProductForm.get('price')?.hasError('pattern')) {
        this.errors.push('Only decimal values are allowed in Price field');
      }
      return;
    }
    this.errors = [];
    const product: Product = {
      name: this.AddProductForm.value.name,
      description: this.AddProductForm.value.description,
      category: this.AddProductForm.value.category,
      quantity: Number(this.AddProductForm.value.quantity),
      price: Number(this.AddProductForm.value.price),
      discount: Number(this.AddProductForm.value.discount),
      specifications: this.AddProductForm.value.specification,
      image: this.selectedImage
    };
    this.service.Add(product).subscribe({
      next: (response) => {
        this.toastService.showSuccess("Product added successfully");
        this.AddProductForm.reset();
      },
      error: (err) => {
        let resErrors: any[] = err.error.model.Errors.errors;
        resErrors.forEach(e => {
          this.errors.push(e.errorMessage);
        })
      }
    })
  }
}

