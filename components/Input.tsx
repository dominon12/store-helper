import { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import Label from "./Label";

const InputLabel = styled.label``;

const InputField = styled.input``;

interface Props {
  value: string;
  setValue: (nextValue: string) => void;
  labelText: string;
  placeholderText: string;
  type: HTMLInputTypeAttribute;
}

const Input: React.FC<Props> = (props) => {
  return (
    <InputLabel>
      <Label>{props.labelText}</Label>
      <InputField
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        placeholder={props.placeholderText}
        type={props.type}
      />
    </InputLabel>
  );
};

export default Input;
