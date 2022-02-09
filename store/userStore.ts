import { makeAutoObservable } from "mobx";

import { URLS } from "./../services/api-service";
import { User } from "../types/api-types";
import { wait } from "../services/helper-service";
import Requester from "../services/Requester";

class UserStore {
  private _user: User | null = null;
  private _userKey = "user";
  private _authToken: string | null = null;
  private _authTokenKey = "authToken";
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

    const tokenError = await this._fetchAuthToken(username, password);
    if (tokenError) this._errors.push(tokenError);

    const userDataError = await this._fetchUserData();
    if (userDataError) this._errors.push(userDataError);

    this._isLoading = false;
  }

  logout() {
    this.user = null;
    this.authToken = null;
  }

  get user() {
    return this._user;
  }

  get authToken() {
    return this._authToken;
  }

  get isLoading() {
    return this._isLoading;
  }

  get errors() {
    return this._errors;
  }

  get isAuthenticated() {
    return !!(this._user && this._authToken);
  }

  private _initializeStore() {
    if (typeof window !== "undefined") {
      // get saves token and user data from local storage
      const savedAuthToken = localStorage.getItem(this._authTokenKey);
      const savedUser = localStorage.getItem(this._userKey);

      if (savedAuthToken && savedUser) {
        // save saved values to the store
        // if they exists
        this._authToken = savedAuthToken;
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

  private set authToken(token: string | null) {
    // save passed token to the store
    this._authToken = token;

    if (typeof window !== "undefined") {
      // check if we're on the client side
      if (token) {
        // get token from local storage
        const savedToken = localStorage.getItem(this._authTokenKey);

        if (savedToken !== token) {
          // if saved token is different from the passed one,
          // update value in local storage
          localStorage.setItem(this._authTokenKey, token);
        }
      } else {
        // if there was no passed token, remove local storage's value
        localStorage.removeItem(this._authTokenKey);
      }
    }
  }

  private async _fetchAuthToken(username: string, password: string) {
    // send request to obtain auth token
    const res = await Requester.post<{ token: string }>({
      url: URLS.auth + "token/",
      body: { username, password },
    });

    if (res.error || !res.data) {
      // in case of errors, return them
      return res.error || "Error fetching auth token";
    } else {
      // if there were no errors, save auth token to the store
      const { token } = res.data;
      this.authToken = token;
    }
  }

  private async _fetchUserData() {
    // send request to get info about the current user
    const userDataRes = await Requester.get<{ is_superuser: boolean }>({
      url: URLS.auth + "current/",
      token: this.authToken,
    });

    if (userDataRes.error || !userDataRes.data) {
      // if there was an error, return error message
      return userDataRes.error || "Error fetching user data";
    } else {
      // if there were no errors, save user data to the store
      const userData = userDataRes.data;
      this.user = { isAdmin: userData.is_superuser };
    }
  }
}

const userStore = new UserStore();

export default userStore;
