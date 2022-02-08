import { NextRouter, Router } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Product } from "../types/api-types";
import { performGET, performRequestWithBody, URLS } from "./api-service";
import { wait } from "./helper-service";

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
  authToken: string | null;
}

class ProductService {
  static async get(props: GetProductProps) {
    props.setIsLoading(true);

    props.setErrors([]);

    await wait(500);

    const res = await performGET(URLS.products + props.productId);

    props.setIsLoading(false);

    if (res.error) {
      props.setErrors([
        "Producto con este número de referencia no existe o no se puede conectarse al servidor",
      ]);
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

    await wait(1000);

    const productFormData = new FormData();
    productFormData.append("name", props.formData.name);
    productFormData.append("description", props.formData.description);
    productFormData.append("price", props.formData.price);
    productFormData.append("image", props.image);

    try {
      const res = await performRequestWithBody<Product>(
        URLS.products,
        productFormData,
        {
          token: props.authToken,
        }
      );

      if (res.error || !res.data) throw new Error(res.error || "API Error");
      else props.router.push(`/products/${res.data?._id}`);
    } catch (e) {
      props.setErrors([(e as Error).toString()]);
    } finally {
      props.setIsLoading(false);
    }
  }

  static async edit(props: EditProductProps) {
    props.setIsLoading(true);

    await wait(1000);

    const productFormData = new FormData();
    if (props.formData.name !== props.product.name)
      productFormData.append("name", props.formData.name);
    if (props.formData.description !== props.product.description)
      productFormData.append("description", props.formData.description);
    if (props.formData.price !== props.product.price.toString())
      productFormData.append("price", props.formData.price);
    if (props.image) productFormData.append("image", props.image);

    try {
      const res = await performRequestWithBody<Product>(
        URLS.products + props.product._id + "/",
        productFormData,
        {
          token: props.authToken,
          method: "PATCH",
        }
      );

      if (res.error || !res.data) throw new Error(res.error || "API Error");
      else props.router.push(`/products/${res.data?._id}`);
    } catch (e) {
      props.setErrors([(e as Error).toString()]);
    } finally {
      props.setIsLoading(false);
    }
  }

  static async delete(props: DeleteProductProps) {
    props.setIsLoading(true);

    await wait(1000);

    console.log({ productId: props.productId });

    await fetch(URLS.products + props.productId + "/", {
      method: "DELETE",
      headers: { Authorization: `Token ${props.authToken}` },
    });

    props.setIsLoading(false);

    props.router.push("/products");
  }
}

export default ProductService;
