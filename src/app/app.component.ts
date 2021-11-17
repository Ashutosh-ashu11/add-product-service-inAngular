import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicPojoComponent } from './dynamic-pojo/dynamic-pojo.component';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  productForm: FormGroup;
  durationInSeconds = 5; 
  columnTypeS:string[]=["CHAR", "VARCHAR","INT","INTEGER","FLOAT","DOUBLE"
  ,"DATE","DATETIME","TIMESTAMP","TIME","YEAR"]; 
  selected:string= "CHAR"
  
  constructor(private fb:FormBuilder,
              private _productListService:ProductListService,
               private _dialog: MatDialog,private _snackBar:MatSnackBar) {
   
    this.productForm = this.fb.group({
      tableName: new FormControl('',Validators.required ),
      columnesDetails: this.fb.array([]),
    });
  }
  
  columnesDetails() : FormArray {
    return this.productForm.get("columnesDetails") as FormArray
  }
   
  newList(): FormGroup {
    return this.fb.group({
      columnName: new FormControl('', Validators.required) ,
      columnType: new FormControl('',  Validators.required),
    })
  }
   
  addList() {
    this.columnesDetails().push(this.newList());
  }
   
  removeList(i:number) {
    this.columnesDetails().removeAt(i);
  }
  isValid:boolean =false;
  onSubmit() {
    if(this.validation()){
    this._productListService.productList(this.productForm.value
      //send object from here that is 'this.productForm.value'
    ).subscribe((value:any)=>{
      if(value != null && value !=undefined){
       //if value is success then show message on dialogue box submission is successfull and vice-versa 
       this.messageOfSuccessFail(value.responseMesage);
      }
    });
    this.isValid =false;
    }
    else{
      this._snackBar.open("please fill the tableName and ColumnName");
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }
  }
  ngOnInit(){
    this.addList();
  }
 messageOfSuccessFail(value:string){
  this._dialog.open(DynamicPojoComponent,{
    data:{
      value:value
    }
  });
 }
  validation():boolean{
   this.productForm.get('columnesDetails')?.value.forEach((element:any) => {
     this.isValid =false;
     if( element.columnName !=''
       && this.productForm.get('tableName')?.value!='')
       this.isValid = true;      
   });
   return this.isValid;
  } 
}


