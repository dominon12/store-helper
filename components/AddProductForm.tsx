import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { changeFieldValue } from "../services/form-service";
import FormTemplate from "./FormTemplate";
import ImageUploader from "./ImageUploader";
import Input from "./Input";

const Wrapper = styled.section`
  display: flex;
`;

const FormField = styled(Input)`
  margin-bottom: 1rem;
`;

const AddProductForm: FC = (props) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    title: "",
    description: "",
    price: "",
  });

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleFormSubmit = () => {};

  return (
    <Wrapper>
      <ImageUploader />
      <FormTemplate
        submitCallback={handleFormSubmit}
        errors={errors}
        isLoading={isLoading}
        isValid={formValid}
        buttonText="Guardar"
      >
        <FormField
          ref={titleInputRef}
          value={formData.title}
          setValue={changeFieldValue("title", setFormData)}
          labelText="Nombre del producto"
          placeholderText="Nombre del producto"
          type="text"
          validators={{
            emptyStringValidator: true,
            minLengthValidator: 8,
          }}
          required
        />

        <FormField
          ref={descriptionInputRef}
          value={formData.description}
          setValue={changeFieldValue("description", setFormData)}
          labelText="Descripción"
          placeholderText="Descripción"
          type="text"
          validators={{
            emptyStringValidator: true,
            minLengthValidator: 20,
          }}
          required
          big
        />

        <FormField
          ref={priceInputRef}
          value={formData.price}
          setValue={changeFieldValue("price", setFormData)}
          labelText="Precio"
          placeholderText="Precio"
          type="number"
          validators={{
            emptyStringValidator: true,
          }}
          required
        />
      </FormTemplate>
    </Wrapper>
  );
};

export default AddProductForm;
