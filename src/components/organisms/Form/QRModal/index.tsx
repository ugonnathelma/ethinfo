import React, { ReactNode } from "react";
import { Wrapper, CloseButton } from "./styles";

const QRModal = ({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) => (
  <Wrapper data-testid="qr-modal">
    <CloseButton data-testid="qr-modal-close" onClick={closeModal}>
      ✕
    </CloseButton>
    <div>{children}</div>
  </Wrapper>
);

export default QRModal;
