import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAboutDialog() {
    const options = {
      width: '95%',
      maxWidth: '575px',
      minWidth: '290px',
      maxHeight: '550px'
    }
    const dialogRef = this.dialog.open(AboutDialogComponent, options);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
