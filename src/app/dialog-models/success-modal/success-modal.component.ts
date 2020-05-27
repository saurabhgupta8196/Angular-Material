import { Component, OnInit, Inject, Injectable } from "@angular/core";

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-success-modal",
  templateUrl: "./success-modal.component.html",
  styleUrls: ["./success-modal.component.css"],
})
export class SuccessModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
