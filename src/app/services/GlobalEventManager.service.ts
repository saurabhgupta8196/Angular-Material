import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";

@Injectable()
export class GlobalEventsManager {
  private _showComponent: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showComponentEmitter: Observable<
    boolean
  > = this._showComponent.asObservable();

  constructor() {}

  showComponent(ifShow) {
    this._showComponent.next(ifShow);
  }
}
