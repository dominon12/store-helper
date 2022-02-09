import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import ProductService from "../services/ProductService";

import FormTemplate from "./FormTemplate";
import Input from "./Input";

const FormField = styled(Input)`
  margin-bottom: 1rem;
`;

const ProductSearcher: FC = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!searchQuery) setIsValid(false);
    else setIsValid(true);
  }, [searchQuery]);

  const searchProduct = () => {
    ProductService.get({
      productId: searchQuery,
      setIsLoading,
      setErrors,
      router,
    });
  };

  return (
    <FormTemplate
      submitCallback={searchProduct}
      isLoading={isLoading}
      errors={errors}
      isValid={isValid}
      buttonText="Buscar"
    >
      <FormField
        value={searchQuery}
        setValue={(e) => setSearchQuery(e.target.value)}
        labelText="Numero de referencia"
        placeholderText="Escribe el numero de referencia"
        type="text"
        validators={{
          emptyStringValidator: true,
        }}
      />
    </FormTemplate>
  );
};

export default ProductSearcher;
