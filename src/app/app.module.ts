import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { MyMaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditFormComponent } from "./dialog-models/edit-form/edit-form.component";
import { SuccessModalComponent } from "./dialog-models/success-modal/success-modal.component";

import { UserService } from "./services/user.service";
import { GlobalEventsManager } from "./services/GlobalEventManager.service";
import { CommonModalComponent } from "./dialog-models/common-modal/common-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UsersListComponent,
    EditFormComponent,
    SuccessModalComponent,
    CommonModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, GlobalEventsManager],
  bootstrap: [AppComponent],
})
export class AppModule {}
