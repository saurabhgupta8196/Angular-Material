import { Component } from "@angular/core";

import { GlobalEventsManager } from "./services/GlobalEventManager.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Angular-Material-Demo";
  showUserList = false;
  showSignIn_SignOut: string;
  constructor(private globalEventsManager: GlobalEventsManager) {
    this.globalEventsManager.showComponentEmitter.subscribe((mode) => {
      this.showUserList = mode;
      this.showSignIn_SignOut = this.showUserList ? "Sign Out" : "Sign In";
    });
  }
  signInOut() {
    this.globalEventsManager.showComponent(false);
    this.showSignIn_SignOut = this.showUserList ? "Sign Out" : "Sign In";
  }
}
