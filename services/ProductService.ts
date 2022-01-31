import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Product } from "../types/api-types";
import { performPOST, URLS } from "./api-service";
import { wait } from "./helper-service";

interface AddProductProps {
  formData: { [key: string]: string };
  image: File | null;
  setErrors: Dispatch<SetStateAction<string[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  authToken: string | null;
  router: NextRouter;
}

class ProductService {
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
      const res = await performPOST<Product>(URLS.products, productFormData, {
        token: props.authToken,
      });

      if (res.error || !res.data) throw new Error(res.error || "API Error");
      else props.router.push(`/products/${res.data?.pk}`);
    } catch (e) {
      props.setErrors([(e as Error).toString()]);
    } finally {
      props.setIsLoading(false);
    }
  }
}

export default ProductService;
