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
    if (token) localStorage.setItem(this.storageKey, token);
  }

  private async fetchAuthToken(): Promise<string> {
    const res = await fetch(this.authEndpoint, {
      method: "POST",
      body: JSON.stringify(this.credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Can't obtain auth token");

    const { token } = await res.json();
    return token;
  }
}

export default TokenStorage;
