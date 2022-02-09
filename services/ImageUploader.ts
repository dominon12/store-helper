import { FILE_STORAGE_PASS, FILE_STORAGE_USER } from "./credentials-service";
import Requester from "./Requester";
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
    const res = await Requester.post<{ pk: number; image: string }>({
      url: this.apiUrl + "files/image",
      body: formData,
      token: `Token ${authToken}`,
      dontSerialize: true,
    });
    // throw an error in case something goes wrong with the api
    if (res.error) throw new Error(res.error);
    if (!res.data)
      throw new Error("Image uploader API didn't respond with data");
    // return obtained image data
    const { pk: id, image: src } = res.data;
    return { id, src };
  }

  public static async delete(imageId: number) {
    const authToken = await this.getAuthToken();
    const res = await Requester.delete(
      this.apiUrl + "files/image/" + imageId + "/",
      `Token ${authToken}`
    );
    if (res.error) throw new Error(res.error);
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
