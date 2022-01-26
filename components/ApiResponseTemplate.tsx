import { FC } from "react";
import ErrorData from "./ErrorData";

interface Props {
  render: () => JSX.Element;
  error: string | null;
}

const ApiResponseTemplate: FC<Props> = ({ render, error }) => {
  if (error) {
    return <ErrorData errorMessage={error} />;
  }

  return render();
};

export default ApiResponseTemplate;
