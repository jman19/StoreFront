import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {ProductDetailsComponent} from '../product-details/product-details.component'
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() title:string;
  @Input() inventory:number;
  @Input() price:number;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  moreDetail(){
    console.log("clicked on product")
    this.dialog.open(ProductDetailsComponent,{data:{title:this.title,price:this.price,description:"test"}});

  }

  getInStock():boolean{
    if(this.inventory>0){
      return true
    }
    else{
      return false
    }
  }
  getStockText(): string{
    if(this.inventory>0){
      return "In Stock"
    }
    else{
      return "Out Of Stock"
    }
  }
}
