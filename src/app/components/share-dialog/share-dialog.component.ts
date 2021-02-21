import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

/**
 * Allows the user to share the current page with others.
 */
@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {

  /**
  * @ignore
  */
  constructor(public dialog: MatDialogRef<ShareDialogComponent>) { }

  /**
   * @ignore
   */
  ngOnInit() { }

  /**
   * Returns the full URL so it can be displayed
   * in the UI to be copied and pasted.
   */
  getFullUrl(): string {
    return window.location.href
  }

  /**
   * Copies the URL for the current page to the user's clipboard
   */
  copyToClipboard(): void {
    const url = this.getFullUrl()
    document.addEventListener('copy', (clipboardEvent: ClipboardEvent) => {
      clipboardEvent.clipboardData.setData('text/plain', url);
      clipboardEvent.preventDefault();
    });
    document.execCommand('copy');
  };
}
