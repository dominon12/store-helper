interface RequestResult<T> {
  data: T | null;
  error: string | null;
}

class Requester {
  public static async get<T>(
    url: string,
    token?: string
  ): Promise<RequestResult<T>> {
    const result = this.getBlankReqResult<T>();

    const headers = this.formHeaders({ token });

    try {
      // send request
      const res = await fetch(url, { headers });
      // extract data
      const data = await res.json();
      // check errors
      this.checkErrors<T>(data, res.ok);
      // save data to result
      result.data = data;
    } catch (err) {
      // handle exceptions
      result.error = (err as Error).message;
    }

    return result;
  }

  public static async post<T>(url: string, body: any, token: string | null) {
    const result = this.getBlankReqResult<T>();

    const headers = this.formHeaders({
      token,
      contentType: "application/json",
    });

    const payload = this.formBody(body, { serialize: true });

    try {
      // send request
      const res = await fetch(url, {
        method: "POST",
        body: payload,
        headers,
      });
      // extract data
      const data = await res.json();
      // check errors
      this.checkErrors<T>(data, res.ok);
      // save data to result
      result.data = data;
    } catch (err) {
      result.error = (err as Error).message;
    }

    return result;
  }

  public static async update<T>(
    url: string,
    body: any,
    token: string,
    method: "PUT" | "PATCH" = "PATCH"
  ) {
    const result = this.getBlankReqResult<T>();

    const headers = this.formHeaders({
      token,
      contentType: "application/json",
    });

    const payload = this.formBody(body, { serialize: true });

    try {
      // send request
      const res = await fetch(url, {
        method,
        body: payload,
        headers,
      });
      // extract data
      const data = await res.json();
      // check errors
      this.checkErrors<T>(data, res.ok);
      // save data to result
      result.data = data;
    } catch (err) {
      result.error = (err as Error).message;
    }

    return result;
  }

  private static checkErrors<T>(data: RequestResult<T>, isOk?: boolean) {
    // raise an exception in case of error message
    if (data.error) throw new Error(data.error);
    // raise an exception in case of not OK response
    if (!isOk) throw new Error(data.toString());
    // raise an exception if there is no data
    if (!data) throw new Error("No data");
  }

  private static formBody(body: any, props?: { serialize: boolean }) {
    const payload = props?.serialize ? JSON.stringify(body) : body;
    return payload;
  }

  private static formHeaders(props: {
    token?: string | null;
    contentType?: string;
  }): HeadersInit {
    let headers: HeadersInit = {};

    if (props.token) headers["Authorization"] = `Token ${props.token}`;
    if (props.contentType) headers["Content-Type"] = props.contentType;

    return headers;
  }

  private static getBlankReqResult<T>(): RequestResult<T> {
    return {
      data: null,
      error: null,
    };
  }
}

export default Requester;
