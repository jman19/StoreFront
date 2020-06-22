import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {AboutComponent} from '../about/about.component';
import {Router} from '@angular/router';
import {AppConstants} from '../appConstants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private about:AboutComponent,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer,private router:Router) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/Octicons-mark-github.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/linkedin.svg')
    );
  }

  openAbout(){
    this.about.openDialog();
  }

  openHome(){
    this.router.navigate(['/'+AppConstants.signInPath])
  }

  ngOnInit() {
  }

}
