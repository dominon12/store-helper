import { makeAutoObservable } from "mobx";

import { performGET, performPOST, URLS } from "./../services/api-service";
import { User } from "../types/api-types";

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

    const tokenError = await this._fetchAuthToken(username, password);
    // if (tokenError) this._errors.push(tokenError);

    const userDataError = await this._fetchUserData();
    // if (userDataError) this._errors.push(userDataError);

    this._isLoading = false;
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
      const savedAuthToken = localStorage.getItem(this._authTokenKey);
      const savedUser = localStorage.getItem(this._userKey);

      if (savedAuthToken && savedUser) {
        this._authToken = savedAuthToken;
        this._user = JSON.parse(savedUser);
      }
    }
  }

  private set user(userData: User | null) {
    this._user = userData;

    if (typeof window !== "undefined") {
      if (userData) {
        const savedUser = localStorage.getItem(this._userKey);

        if (JSON.stringify(savedUser) !== JSON.stringify(userData)) {
          localStorage.setItem(this._userKey, JSON.stringify(userData));
        }
      } else {
        localStorage.removeItem(this._userKey);
      }
    }
  }

  private set authToken(token: string | null) {
    this._authToken = token;

    if (typeof window !== "undefined") {
      if (token) {
        const savedToken = localStorage.getItem(this._authTokenKey);

        if (savedToken !== token) {
          localStorage.setItem(this._authTokenKey, token);
        }
      } else {
        localStorage.removeItem(this._authTokenKey);
      }
    }
  }

  private async _fetchAuthToken(username: string, password: string) {
    // const authTokenRes = await performPOST<{ token: string }>(
    //   URLS.auth + "token/",
    //   { username, password }
    // );

    // if (authTokenRes.error || !authTokenRes.data) {
    //   return authTokenRes.error || "Error fetching auth token";
    // } else {
    //   const authTokenData = authTokenRes.data;
    //   this.authToken = authTokenData.token;
    // }
    this.authToken = "secret-token";
  }

  private async _fetchUserData() {
    // const userDataRes = await performGET<{ is_superuser: boolean }>(
    //   URLS.auth + "current/"
    // );

    // if (userDataRes.error || !userDataRes.data) {
    //   return userDataRes.error || "Error fetching user data";
    // } else {
    //   const userData = userDataRes.data;
    //   this.user = { isAdmin: userData.is_superuser };
    // }
    this.user = { isAdmin: true };
  }
}

const userStore = new UserStore();

export default userStore;
