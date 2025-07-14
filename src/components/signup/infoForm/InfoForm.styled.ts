import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const ConfirmButton = styled.button`
  border: none;
  background-color: ${Colors.Grayscale0};
  ${FontStyles.XS_Medium};
  color: ${Colors.Grayscale60};
  text-decoration: underline;
  cursor: pointer;

  &:disabled {
    color: ${Colors.Grayscale50};
    cursor: default;
  }
`;
