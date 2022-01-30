import { RequestResult } from "../types/system-types";

const baseUrl = "http://127.0.0.1:8000/api/v1/";

export const URLS = {
  products: baseUrl + "products/",
  auth: baseUrl + "auth/",
};

export async function performGET<T>(url: string) {
  let response: RequestResult<T> = {
    data: null,
    error: null,
  };

  try {
    const res = await fetch(url);
    response.data = await res.json();

    if (!res.ok) throw new Error("API Error");
  } catch (e) {
    response.error = (e as Error).toString();
  }

  return response;
}

export async function performPOST<T>(url: string, body: any) {
  let response: RequestResult<T> = {
    data: null,
    error: null,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    response.data = await res.json();

    if (!res.ok) throw new Error("API Error");
  } catch (e) {
    response.error = (e as Error).toString();
  }

  return response;
}
