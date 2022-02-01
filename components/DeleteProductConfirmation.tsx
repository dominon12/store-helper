import { observer } from "mobx-react-lite";
import { FC } from "react";

interface Props {
  productId: number;
}

const DeleteProductConfirmation: FC<Props> = (props) => {
  return <div>Delete</div>;
};

export default observer(DeleteProductConfirmation);
