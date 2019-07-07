import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: productDetailData,public dialog: MatDialog, 
  private dialogRef:MatDialogRef<ProductDetailsComponent>) { }

  ngOnInit() {
  }

  addToCart(){
    this.dialogRef.close();
  }
}

export interface productDetailData{
  title:string,
  price:number,
  description:string
}
