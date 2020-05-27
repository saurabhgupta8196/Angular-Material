import { Component, OnInit, Inject, Injectable } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-common-modal",
  templateUrl: "./common-modal.component.html",
  styleUrls: ["./common-modal.component.css"],
})
export class CommonModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CommonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog(way) {
    this.dialogRef.close(way);
  }

  ngOnInit(): void {}
}
