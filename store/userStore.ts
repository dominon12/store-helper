import { makeAutoObservable } from "mobx";

import { URLS } from "./../services/api-service";
import { User } from "../types/api-types";
import { wait } from "../services/helper-service";
import Requester from "../services/Requester";

class UserStore {
  private _user: User | null = null;
  private _userKey = "user";
  private _isLoading = false;
  private _errors: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this._initializeStore();
  }

  async authenticate(username: string, password: string) {
    this._errors = [];
    this._isLoading = true;
    await wait(500);

    const userDataError = await this.fetchUserData(username, password);
    if (userDataError) this._errors.push(userDataError);

    this._isLoading = false;
  }

  logout() {
    this.user = null;
  }

  get user() {
    return this._user;
  }

  get isLoading() {
    return this._isLoading;
  }

  get errors() {
    return this._errors;
  }

  get isAuthenticated() {
    return this.user && Date.now() < this.user.expiresIn * 1000;
  }

  private _initializeStore() {
    if (typeof window !== "undefined") {
      // get saves token and user data from local storage
      const savedUser = localStorage.getItem(this._userKey);

      if (savedUser) {
        // save saved values to the store
        // if they exists
        this._user = JSON.parse(savedUser);
      }
    }
  }

  private set user(userData: User | null) {
    // save passed user data to the store
    this._user = userData;

    if (typeof window !== "undefined") {
      // check if we're on the client side
      if (userData) {
        // get saved user data from the local storage
        const savedUser = localStorage.getItem(this._userKey);

        if (JSON.stringify(savedUser) !== JSON.stringify(userData)) {
          // if passed user data and saved user data are ont equal,
          // save passed user data to the local storage
          localStorage.setItem(this._userKey, JSON.stringify(userData));
        }
      } else {
        // if there was no user data, remove local storage's value
        localStorage.removeItem(this._userKey);
      }
    }
  }

  private async fetchUserData(username: string, password: string) {
    // send request to get info about the current user
    const userDataRes = await Requester.post<User>({
      url: URLS.auth + "login/",
      body: { username, password },
    });

    if (userDataRes.error || !userDataRes.data) {
      // if there was an error, return error message
      return userDataRes.error || "Error fetching user data";
    } else {
      // if there were no errors, save user data to the store
      const userData = userDataRes.data;
      this.user = userData;
    }
  }
}

const userStore = new UserStore();

export default userStore;
