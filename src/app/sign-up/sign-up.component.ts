import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormGroupDirective,
} from "@angular/forms";
import { UserService } from "../services/user.service";
import { Users } from "../models/user.interface";
import { GlobalEventsManager } from "../services/GlobalEventManager.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  regiForm: FormGroup;
  _id: number = 0;
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  dob: Date = null;
  gender: string = "";
  blog: string = "";
  email: string = "";
  isAccepted: number = 0;
  create_edit: string = "Create";
  @ViewChild("formDirective") formDirective: NgForm;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private globalEventsManager: GlobalEventsManager
  ) {
    // To initialize FormGroup
    this.regiForm = fb.group({
      _id: [Math.floor(1000 + Math.random() * 9000)],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(500),
        ]),
      ],
      dob: [null, Validators.required],
      gender: [null, Validators.required],
      blog: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      isAccepted: [null],
    });
  }

  // On Change event of Toggle Button
  onChange(event: any) {
    if (event.checked == true) {
      this.isAccepted = 1;
    } else {
      this.isAccepted = 0;
    }
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: FormGroupDirective) {
    if (form.valid) {
      if (this.create_edit === "Create") {
        this.userService.createAccount(form.value).subscribe(() => {
          console.log("Data Added Successfully");
        });
        this.globalEventsManager.showComponent(true);
        this.router.navigate(["userLists"]);
      }
      if (this.create_edit === "Edit") {
        this.userService
          .updateAccount(form.value)
          .subscribe(() => this.router.navigate(["userLists"]));
      }
    }
    this.formDirective.resetForm();
  }

  /** For moving from UserList to SignUp Component for Editing account */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const acctId = +params.get("_id");
      if (acctId) {
        this.create_edit = "Edit";
        this.getAccount(acctId);
      }
    });
  }

  /** Getting the data of the particular account owner from service */

  getAccount(_id: number) {
    this.userService.getAccountById(_id).subscribe(
      (account: Users) => {
        this.editAccount(account);
      },
      (err) => console.log(err)
    );
  }

  /** Putting the value into form after getting account details from above function */

  editAccount(account: Users) {
    console.log(account);
    this.regiForm.patchValue({
      _id: account._id,
      firstName: account.firstName,
      lastName: account.lastName,
      address: account.address,
      dob: account.dob,
      gender: account.gender,
      blog: account.blog,
      email: account.email,
      isAccepted: !account.isAccepted,
    });
  }

  resetFormData() {
    this.formDirective.resetForm();
  }
}
