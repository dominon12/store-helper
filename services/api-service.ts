import { RequestOptions, RequestResult } from "../types/system-types";

// const apiBaseUrl = "http://127.0.0.1:8000/api/v1/";
// const apiBaseUrl = "https://dominon12.pythonanywhere.com/api/v1/";
export const baseUrl = "http://localhost:3000/";
const apiBaseUrl = "http://localhost:3000/api/";

export const URLS = {
  products: apiBaseUrl + "products/",
  auth: apiBaseUrl + "accounts/",
};

export async function performGET<T>(url: string, token?: string | null) {
  let response: RequestResult<T> = {
    data: null,
    error: null,
  };

  let headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  try {
    const res = await fetch(url, { headers });
    response.data = await res.json();

    if (!res.ok) throw new Error("API Error");
  } catch (e) {
    response.error = (e as Error).toString();
  }

  return response;
}

export async function performRequestWithBody<T>(
  url: string,
  body: any,
  options?: RequestOptions
) {
  let response: RequestResult<T> = {
    data: null,
    error: null,
  };
  // form headers
  let headers: HeadersInit = {};
  if (options?.token) headers["Authorization"] = `Token ${options.token}`;
  if (options?.contentType) headers["Content-Type"] = options.contentType;
  // form body
  const payload = options?.serialize ? JSON.stringify(body) : body;

  try {
    const res = await fetch(url, {
      method: options?.method ?? "POST",
      body: payload,
      headers,
    });
    response.data = await res.json();

    if (!res.ok) throw new Error("API Error");
  } catch (e) {
    response.error = (e as Error).toString();
  }

  return response;
}
