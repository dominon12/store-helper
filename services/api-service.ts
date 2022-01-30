import { RequestResult } from "../types/system-types";

const baseUrl = "http://127.0.0.1:8000/api/v1/";

export const URLS = {
  products: baseUrl + "products/",
  auth: baseUrl + "accounts/",
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

export async function performPOST<T>(
  url: string,
  body: any,
  token?: string | null
) {
  let response: RequestResult<T> = {
    data: null,
    error: null,
  };

  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
    response.data = await res.json();

    if (!res.ok) throw new Error("API Error");
  } catch (e) {
    response.error = (e as Error).toString();
  }

  return response;
}
