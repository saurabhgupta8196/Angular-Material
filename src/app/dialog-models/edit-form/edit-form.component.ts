import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { UserService } from "../../services/user.service";
import { Users } from "../../models/user.interface";

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.scss"],
})
export class EditFormComponent implements OnInit {
  public form: FormGroup;
  public _id: number;
  public firstName: string;
  public lastName: string;
  public minDate: Date = new Date("01/01/1900");
  public maxDate: Date = new Date();
  public dob: Date;
  public email: string;
  public address: string;
  public gender: string;
  public blog: string;
  public isAccepted: number = 0;
  private _dialogConfig: object;
  private _unSubscribe: Subject<void> = new Subject();

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _router: Router,
    private _dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: Users
  ) {
    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dob = data.dob;
    this.email = data.email;
    this.gender = data.gender;
    this.address = data.address;
    this.blog = data.blog;
    this.isAccepted = data.isAccepted;
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      _id: [this._id, []],
      firstName: [this.firstName, []],
      lastName: [this.lastName, []],
      dob: [this.dob, []],
      email: [this.email, []],
      gender: [this.gender, []],
      address: [this.address, []],
      blog: [this.blog, []],
      isAccepted: [this.isAccepted, []],
    });

    this._dialogConfig = {
      width: "500px",
      disableClose: true,
      data: this.form.value,
    };
  }

  ngOnDestroy(): void {
    this._unSubscribe.next();
    this._unSubscribe.complete();
  }

  public close() {
    this._dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  public submitUpdate() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Update the account record using the PUT (/account/:id)
      // endpoint
      // this._userService
      //   .updateAccount(this.form.value)
      //   .subscribe((res) => {
      //     // we'd notify the user here if the update operation was
      //     // successful or not, proceed accordingly.
      //     const dialogRef = this._dialog.open(
      //       SuccessDialogComponent,
      //       this._dialogConfig
      //     );
      //     dialogRef.afterClosed().subscribe((response) => {
      //       this._dialogRef.close();
      //     });
      //   });

      this._userService
        .updateAccount(this.form.value)
        .subscribe(() => this._dialogRef.close());
      this._router.navigate(["userLists"]);
    }

    // temporary form Submit handling
    // if (this.form.valid) {
    //     const dialogRef = this._dialog.open(SuccessDialogComponent, this._dialogConfig);
    //     dialogRef.afterClosed()
    //         .subscribe(res => {
    //             this._dialogRef.close();
    //         });
    // } else {
    //     // error message handling.
    // }
  }
}
