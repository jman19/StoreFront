import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss']
})
export class ErrorBannerComponent implements OnInit {

  @Input() errorMessage:string;
  constructor() {}

  ngOnInit() {
  }

}
