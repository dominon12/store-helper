import { FILE_STORAGE_PASS, FILE_STORAGE_USER } from "./credentials-service";
import TokenStorage from "./TokenStorage";

class ImageUploader {
  private static apiUrl = "http://127.0.0.1:8000/api/v1/";

  public static async upload(image: File) {
    // prepare form data
    const formData = new FormData();
    formData.append("image", image);
    // get auth token
    const authToken = await this.getAuthToken();
    // make request
    const res = await fetch(this.apiUrl + "files/image/", {
      method: "POST",
      body: formData,
      headers: { Authorization: `Token ${authToken}` },
    });
    // throw an error in case something goes wrong with an api
    if (!res.ok)
      throw new Error("Image Uploader API didn't respond with OK code");
    // return obtained image data
    const { pk: id, image: src } = await res.json();
    return { id, src };
  }

  private static async getAuthToken() {
    const tokenStorage = new TokenStorage({
      credentials: {
        username: FILE_STORAGE_USER,
        password: FILE_STORAGE_PASS,
      },
      storageKey: "imageUploaderAuthToken",
      authEndpoint: this.apiUrl + "accounts/token/",
    });

    const authToken = await tokenStorage.getAuthToken();
    return authToken;
  }
}

export default ImageUploader;
