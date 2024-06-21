import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrls: ['./terms-dialog.component.scss']
})
export class TermsDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TermsDialogComponent>
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close('Ok!');
  }
}
