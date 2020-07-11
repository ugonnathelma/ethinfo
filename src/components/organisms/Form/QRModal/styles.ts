import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1.5em;
  right: 0;
  background: white;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  width: 300px;
  height: 300px;
  position: absolute;
`;

export const CloseButton = styled.div`
  border-radius: 100%;
  border: 2px solid black;
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: absolute;
  right: 1.5em;
  top: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
