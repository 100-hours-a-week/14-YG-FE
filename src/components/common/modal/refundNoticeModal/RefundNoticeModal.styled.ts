import styled from "styled-components";
import { Colors } from "../../../../styles";
import XIcon from "../../../../assets/icons/XIcon.svg?react";

export const Container = styled.div`
  background-color: ${Colors.Grayscale0};
  display: flex;
  flex-direction: column;
  width: 350px;
  align-items: center;
  gap: 10px;
  padding: 40px 30px;
  border-radius: 20px;
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledXIcon = styled(XIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
