import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonModalComponent } from "../dialog-models/common-modal/common-modal.component";

import { GlobalEventsManager } from "../services/GlobalEventManager.service";

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private globalEventsManager: GlobalEventsManager
  ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
      isSignIn: [true],
    });
  }

  submit() {
    if (!this.signinForm.valid) {
      return;
    }
    if (
      this.signinForm.value.email == "demo@gmail.com" &&
      this.signinForm.value.password == "demo"
    ) {
      this.dialog.open(CommonModalComponent, {
        data: this.signinForm.value,
      });
      /** After successful login this userList component is visible */
      this.globalEventsManager.showComponent(true);

      this.router.navigate(["userLists"]);
    } else {
      this.signinForm.value.isSignIn = false;
      this.dialog.open(CommonModalComponent, {
        data: this.signinForm.value,
      });
    }
  }
}
