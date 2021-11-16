import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  productForm: FormGroup;
  durationInSeconds = 5; 
  constructor(private fb:FormBuilder, private _productListService:ProductListService, private _snackBar: MatSnackBar) {
   
    this.productForm = this.fb.group({
      productName: '',
      ListofProduct: this.fb.array([]),
    });
  }
  
  ListofProduct() : FormArray {
    return this.productForm.get("ListofProduct") as FormArray
  }
   
  newList(): FormGroup {
    return this.fb.group({
      vendorName: '',
      vendorType: '',
    })
  }
   
  addList() {
    this.ListofProduct().push(this.newList());
  }
   
  removeList(i:number) {
    this.ListofProduct().removeAt(i);
  }
   
  onSubmit() {
    this._productListService.productList({
      //send object from here that is 'this.productForm.value'
    }).subscribe((value:any)=>{
      if(value != null && value !=undefined){
       //if value is success then show message on dialogue box submission is successfull and vice-versa 
       this.messageOfSuccessFail(value, "Close");
      }
    });
    console.log(this.productForm.value);
  }
  ngOnInit(){
    this.addList();
    
  }
 messageOfSuccessFail(message: string, action: string){
  this._snackBar.open(message, action);
 }
}


