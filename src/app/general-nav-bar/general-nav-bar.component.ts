import { Component, OnInit } from '@angular/core';
import {AboutComponent} from '../about/about.component'
@Component({
  selector: 'app-general-nav-bar',
  templateUrl: './general-nav-bar.component.html',
  styleUrls: ['./general-nav-bar.component.scss']
})
export class GeneralNavBarComponent implements OnInit {

  constructor(private about:AboutComponent) { }

  ngOnInit() {
  }
  openAbout(){
    this.about.openDialog();
  }

}
