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
      tableName: '',
      columnesDetails: this.fb.array([]),
    });
  }
  
  columnesDetails() : FormArray {
    return this.productForm.get("columnesDetails") as FormArray
  }
   
  newList(): FormGroup {
    return this.fb.group({
      columnName: '',
      columnType: '',
    })
  }
   
  addList() {
    this.columnesDetails().push(this.newList());
  }
   
  removeList(i:number) {
    this.columnesDetails().removeAt(i);
  }
   
  onSubmit() {
    this._productListService.productList(this.productForm.value
      //send object from here that is 'this.productForm.value'
    ).subscribe((value:any)=>{
      if(value != null && value !=undefined){
       //if value is success then show message on dialogue box submission is successfull and vice-versa 
       this.messageOfSuccessFail(value.responseMesage, "Close");
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


