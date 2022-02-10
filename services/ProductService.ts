import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import { URLS } from "./api-service";
import { wait } from "./helper-service";
import ImageUploader from "./ImageUploader";
import Requester from "./Requester";
import { Product } from "../types/api-types";

interface GetProductProps {
  productId: string;
  setErrors: Dispatch<SetStateAction<string[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
}

interface AddProductProps {
  formData: { [key: string]: string };
  image: File | null;
  setErrors: Dispatch<SetStateAction<string[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  authToken: string | null;
  router: NextRouter;
}

interface EditProductProps {
  formData: { [key: string]: string };
  product: Product;
  image: File | null;
  setErrors: Dispatch<SetStateAction<string[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  authToken: string | null;
  router: NextRouter;
}

interface DeleteProductProps {
  productId: string;
  router: NextRouter;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  authToken: string | null;
}

class ProductService {
  static async get(props: GetProductProps) {
    props.setIsLoading(true);

    props.setErrors([]);

    await wait(500);

    const res = await Requester.get({
      url: URLS.products + props.productId,
    });

    props.setIsLoading(false);

    if (res.error) {
      props.setErrors([res.error]);
    } else {
      props.router.push(`/products/${props.productId}`);
    }
  }

  static async add(props: AddProductProps) {
    if (!props.image) {
      props.setErrors([
        "Antes de enviar el formulario hay que subir una imagen",
      ]);
      return;
    }

    props.setIsLoading(true);
    await wait(500);

    try {
      // upload an image
      const imageProps = await ImageUploader.upload(props.image);
      (props.formData as any).image = imageProps;
      // make a request
      const res = await Requester.post<Product>({
        url: URLS.products,
        body: props.formData,
        token: props.authToken,
      });
      // throw new error in case of error
      if (res.error) throw new Error(res.error);
      // throw new error if no data was returned
      if (!res.data)
        throw new Error("No data was returned from tne Products API");
      // navigate user to product's page
      else props.router.push(`/products/${res.data._id}`);
    } catch (e) {
      props.setErrors([(e as Error).message]);
    } finally {
      props.setIsLoading(false);
    }
  }

  static async edit(props: EditProductProps) {
    props.setIsLoading(true);

    await wait(500);

    try {
      if (props.image) {
        // delete old image
        await ImageUploader.delete(props.product.image.id);
        // upload new image
        const newImageProps = await ImageUploader.upload(props.image);
        // set new image's props to the form data
        (props.formData as any).image = newImageProps;
      }
      // send request to update the product
      const res = await Requester.update<Product>({
        url: URLS.products + props.product._id,
        body: props.formData,
        token: props.authToken,
      });

      // throw new error in case of error
      if (res.error) throw new Error(res.error);
      // throw new error if no data was returned
      if (!res.data)
        throw new Error("No data was returned from the Products API");
      // navigate user to product's page
      else props.router.push(`/products/${res.data?._id}`);
    } catch (e) {
      props.setErrors([(e as Error).message]);
    } finally {
      props.setIsLoading(false);
    }
  }

  static async delete(props: DeleteProductProps) {
    props.setIsLoading(true);
    props.setError(null);
    await wait(500);

    try {
      const res = await Requester.delete(
        URLS.products + props.productId + "/",
        props.authToken
      );

      if (res.error) throw new Error(res.error);
      else props.router.push("/products");
    } catch (err) {
      props.setError((err as Error).message);
    } finally {
      props.setIsLoading(false);
    }
  }
}

export default ProductService;
