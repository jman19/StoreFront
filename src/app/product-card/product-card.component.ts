import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() title:string;
  @Input() inventory:number;

  constructor() { }

  ngOnInit() {
  }

  moreDetail(){
    console.log("clicked on product")
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
