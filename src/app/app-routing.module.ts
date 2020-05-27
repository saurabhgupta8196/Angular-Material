import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { UsersListComponent } from "./users-list/users-list.component";

const routes: Routes = [
  { path: "signin", component: SignInComponent },
  { path: "signup", component: SignUpComponent },
  { path: "edit/:_id", component: SignUpComponent },
  { path: "userLists", component: UsersListComponent },
  { path: "", redirectTo: "/signin", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
