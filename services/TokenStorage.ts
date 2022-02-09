import Requester from "./Requester";

interface Credentials {
  username?: string;
  password?: string;
}

interface TokenStorageProps {
  credentials: Credentials;
  storageKey: string;
  authEndpoint: string;
}

class TokenStorage {
  private credentials: Credentials;
  private storageKey: string;
  private authEndpoint: string;

  constructor(props: TokenStorageProps) {
    this.credentials = props.credentials;
    this.storageKey = props.storageKey;
    this.authEndpoint = props.authEndpoint;
  }

  public async getAuthToken() {
    let token = this.savedToken;
    if (!token) {
      token = await this.fetchAuthToken();
      this.savedToken = token;
    }
    return token;
  }

  private get savedToken() {
    return localStorage.getItem(this.storageKey);
  }

  private set savedToken(token: string | null) {
    if (typeof window !== "undefined") {
      if (token) {
        if (this.savedToken !== token) {
          // if there is a token and it's different from
          // the saved one,  save it to local storage
          localStorage.setItem(this.storageKey, token);
        }
      } else {
        // if there is no passed token, remove localStorage item
        localStorage.removeItem(this.storageKey);
      }
    }
  }

  private async fetchAuthToken(): Promise<string> {
    const res = await Requester.post<{ token: string }>({
      url: this.authEndpoint,
      body: this.credentials,
    });

    if (res.error) throw new Error(res.error);
    if (!res.data) throw new Error("No data was returned for AuthToken API");

    const { token } = res.data;
    return token;
  }
}

export default TokenStorage;
