import styled from "styled-components";

export const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
