import { Component, OnInit, ViewChild } from "@angular/core";
import { Users } from "../models/user.interface";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";

import { EditFormComponent } from "../dialog-models/edit-form/edit-form.component";
import { CommonModalComponent } from "../dialog-models/common-modal/common-modal.component";

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialog,
} from "@angular/material/dialog";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
  users: Users[];
  dataSource;
  loading = true;

  displayedColumns = ["_id", "name", "dob", "email", "gender", "action"];
  pageSize = 4;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  /** Choose the way you want to edit a form */

  public editSelection(acctInfo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = acctInfo;
    this._dialog
      .open(CommonModalComponent, dialogConfig)
      .afterClosed()
      .subscribe((selected) => {
        if (selected === "component") this.editAccountInComponent(acctInfo);
        if (selected === "modal") this.editAccountInModel(acctInfo);
      });
  }

  /** Edit form in model form example */

  public editAccountInModel(acctInfo) {
    console.log(acctInfo);
    let snackBarRef = this.snackBar.open(
      `Editing customer **${acctInfo.firstName} ${acctInfo.lastName}**`,
      "Undo",
      { duration: 3000 }
    );
    this._openDialog(acctInfo, EditFormComponent);
  }

  /** Edit Form in Form creation component i.e in SignUp Form */

  public editAccountInComponent(acctInfo) {
    let snackBarRef = this.snackBar.open(
      `Editing customer **${acctInfo.firstName} ${acctInfo.lastName}**`,
      "Undo",
      { duration: 3000 }
    );
    this.router.navigate(["/edit", acctInfo._id]);
  }

  public deleteAccount(acctInfo) {
    let snackBarRef = this.snackBar.open(
      `Deleted customer **${acctInfo.firstName} ${acctInfo.lastName}**`,
      "",
      { duration: 3000 }
    );
    this.userService.deleteAccount(acctInfo._id).subscribe((data) => {
      this.ngOnInit();
    });
  }

  private _openDialog(data, component) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    this._dialog
      .open(component, dialogConfig)
      .afterClosed()
      .subscribe(() => this.ngOnInit());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.userService.getAccounts().subscribe((data) => {
      this.users = data;
    });
    this.dataSource = new MatTableDataSource<Users>(this.users);
  }
}
