import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {

  public itemAdded$: EventEmitter<any>;

  constructor() {
    this.itemAdded$ = new EventEmitter();
  }

  //informs subscripted compoenets that an item was added/removed from cart
  public add(): void {
      this.itemAdded$.emit();
  }

}
