import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

/**
* Dialog that contains information about myself and the motivation behind this project.
*/
@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {

  /**
   * @ignore
   */
  constructor(public dialog: MatDialogRef<AboutDialogComponent>) { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
