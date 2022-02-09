interface RequestResult<T> {
  data: T | null;
  error: string | null;
}

interface GetRequestProps {
  url: string;
  token?: string;
}

interface PostRequestProps {
  url: string;
  body: any;
  token: string | null;
  dontSerialize?: boolean;
}

interface UpdateRequestProps {
  url: string;
  body: any;
  token: string | null;
  method?: "PUT" | "PATCH";
}

class Requester {
  public static async get<T>(
    props: GetRequestProps
  ): Promise<RequestResult<T>> {
    const result = this.getBlankReqResult<T>();

    const headers = this.formHeaders({ token: props.token });

    try {
      // send request
      const res = await fetch(props.url, { headers });
      // extract data
      const data = await res.json();
      // check errors
      this.checkErrors(data, res.ok, res.statusText);
      // save data to result
      result.data = data;
    } catch (err) {
      // handle exceptions
      result.error = (err as Error).message;
    }

    return result;
  }

  public static async post<T>(props: PostRequestProps) {
    const result = this.getBlankReqResult<T>();

    const url = this.appendSlash(props.url);

    const headers = this.formHeaders({
      token: props.token,
      contentType: props.dontSerialize ? undefined : "application/json",
    });

    const payload = this.formBody(props.body, { serialize: !props.dontSerialize });

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
      this.checkErrors(data, res.ok, res.statusText);
      // save data to result
      result.data = data;
    } catch (err) {
      result.error = (err as Error).message;
    }

    return result;
  }

  public static async update<T>(props: UpdateRequestProps) {
    const result = this.getBlankReqResult<T>();

    const url = this.appendSlash(props.url);

    const headers = this.formHeaders({
      token: props.token,
      contentType: "application/json",
    });

    const payload = this.formBody(props.body, { serialize: true });

    try {
      // send request
      const res = await fetch(url, {
        method: props.method ?? "PATCH",
        body: payload,
        headers,
      });
      // extract data
      const data = await res.json();
      // check errors
      this.checkErrors(data, res.ok, res.statusText);
      // save data to result
      result.data = data;
    } catch (err) {
      result.error = (err as Error).message;
    }

    return result;
  }

  public static async delete(url: string, token: string | null) {
    const result = this.getBlankReqResult<null>();

    url = this.appendSlash(url);

    const headers = this.formHeaders({ token });

    try {
      const res = await fetch(url, { method: "DELETE", headers });
      this.checkErrors(true, res.ok, res.statusText);
    } catch (err) {
      result.error = (err as Error).message;
    }

    return result;
  }

  private static appendSlash(url: string) {
    if (!url.endsWith("/")) return url + "/";
    return url;
  }

  private static checkErrors(data: any, isOk: boolean, statusText: string) {
    // raise an exception in case of error message
    if (data.error) throw new Error(data.error);
    // raise an exception in case of not OK response
    if (!isOk) throw new Error(statusText);
    // raise an exception if there is no data
    if (!data) throw new Error("No data");
  }

  private static formBody(body: any, props?: { serialize?: boolean }) {
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
