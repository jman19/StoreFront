import { Component, OnInit } from '@angular/core';
import {AppConstants} from '../appConstants';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  constructor(private router:Router, private dialogRef:MatDialogRef<ThankYouComponent>) { }

  ngOnInit() {
  }

  backToStore(){
    this.router.navigate(['/'+AppConstants.storePath]);
    this.dialogRef.close();
  }

  toTracking(){
    this.router.navigate(['/'+AppConstants.clientOrderHistory]);
    this.dialogRef.close();
  }
}
