/* --------------------------
* Accounts API service
- ---------------------------- **/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { Users } from "../models/user.interface";
import { Accounts } from "../data/accounts";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  custAccounts: Users[] = Accounts;

  /**
   * {get} Get all accounts
   */
  public getAccounts() {
    return of(this.custAccounts);
    // return this.http.get<Users[]>(this.baseUrl);
  }

  /**
   * {get} Get account by Id
   */
  public getAccountById(_id: number) {
    let index = this.custAccounts.findIndex((list) => list._id === _id);
    return of(this.custAccounts[index]);
    // return this.http.get<Users[]>(this.baseUrl);
  }

  /**
   * {put} Create an account
   */
  public createAccount(account: Users) {
    this.custAccounts.push(account);
    return of(this.custAccounts);
  }

  /**
   * {put} Update an account
   */
  public updateAccount(account: Users) {
    let index = this.custAccounts.findIndex((list) => list._id === account._id);
    this.custAccounts[index] = account;
    return of(this.custAccounts);
  }

  /**
   * {put} Delete an account
   */
  public deleteAccount(_id) {
    let index = this.custAccounts.findIndex((list) => list._id === _id);
    this.custAccounts.splice(index, 1);
    return of(this.custAccounts);
  }
}
