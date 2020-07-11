import React, { ReactNode } from "react";
import { Wrapper, CloseButton } from "./styles";

const QRModal = ({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) => (
  <Wrapper>
    <CloseButton onClick={closeModal}>✕</CloseButton>
    <div>{children}</div>
  </Wrapper>
);

export default QRModal;
