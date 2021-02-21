import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

/**
 * Project nav bar. Contains only one link with a button to my about page.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  /**
   * @ignore
   */
  constructor(public dialog: MatDialog) { }

  /**
   * @ignore
   */
  ngOnInit() { }

  /**
   * Opens the about me dialog.
   */
  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, {
      width: '95%',
      maxWidth: '575px',
      minWidth: '290px',
      maxHeight: '550px'
    });
  }

}
