import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react-lite";

import FormTemplate from "./FormTemplate";
import Input from "./Input";
import Multiline from "./Multiline";
import ProductImage from "./ProductImage";
import userStore from "../store/userStore";
import ProductService from "../services/ProductService";
import {
  changeFieldValue,
  checkFormValid,
  makeFormValid,
} from "../services/form-service";
import { Product } from "../types/api-types";

const Wrapper = styled.section`
  display: flex;

  @media (max-width: 654px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  margin-right: 1rem;

  @media (max-width: 654px) {
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;

const formFieldStyles = css`
  margin-bottom: 1rem;
`;

const InputField = styled(Input)`
  ${formFieldStyles}
`;

const TextAreaField = styled(Multiline)`
  ${formFieldStyles}
`;

interface Props {
  product?: Product;
}

const ProductForm: FC<Props> = (props) => {
  const router = useRouter();

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(props.product ? true : false);

  const initializeFormWithProductValues = () => {
    if (props.product) {
      setFormData({
        name: props.product.name,
        description: props.product.description,
        price: props.product.price.toString(),
      });
      makeFormValid([
        nameInputRef,
        descriptionInputRef,
        priceInputRef,
        imageInputRef,
      ]);
    }
  };

  useEffect(() => {
    initializeFormWithProductValues();
  }, []);

  const handleValidateForm = () => {
    const valid = checkFormValid([
      nameInputRef,
      descriptionInputRef,
      priceInputRef,
      imageInputRef,
    ]);
    setFormValid(valid);
  };

  useEffect(() => {
    handleValidateForm();
  }, [formData]);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) setImage(files[0]);
  };

  const handleFormSubmit = async () => {
    if (props.product) {
      ProductService.edit({
        formData,
        product: props.product,
        image,
        setErrors,
        setIsLoading,
        authToken: userStore.user!.token,
        router,
      });
    } else {
      ProductService.add({
        formData,
        image,
        setErrors,
        setIsLoading,
        authToken: userStore.user!.token,
        router,
      });
    }
  };

  const imageSrc = () => {
    if (image) return URL.createObjectURL(image);
    if (props.product) return props.product.image.src;
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <ProductImage src={imageSrc()} alt="Uploaded image" />
      </ImageWrapper>
      <FormTemplate
        submitCallback={handleFormSubmit}
        errors={errors}
        isLoading={isLoading}
        isValid={formValid}
        buttonText="Guardar"
      >
        <InputField
          ref={nameInputRef}
          value={formData.name}
          setValue={changeFieldValue("name", setFormData)}
          labelText="Nombre del producto"
          placeholderText="Nombre del producto"
          type="text"
          validators={{
            emptyStringValidator: true,
            minLengthValidator: 8,
          }}
          required
        />

        <TextAreaField
          ref={descriptionInputRef}
          value={formData.description}
          setValue={changeFieldValue("description", setFormData)}
          labelText="Descripción"
          placeholderText="Descripción"
          validators={{
            emptyStringValidator: true,
            minLengthValidator: 20,
          }}
          required
        />

        <InputField
          ref={priceInputRef}
          value={formData.price}
          setValue={changeFieldValue("price", setFormData)}
          labelText="Precio"
          placeholderText="Precio"
          type="number"
          validators={{ emptyStringValidator: true }}
          required
        />

        <InputField
          setValue={uploadImage}
          labelText="Imagen"
          placeholderText="Imagen"
          type="file"
          validators={{
            emptyStringValidator: true,
          }}
          accept="image/*"
          required={!(props.product && !image)}
        />
      </FormTemplate>
    </Wrapper>
  );
};

export default observer(ProductForm);
