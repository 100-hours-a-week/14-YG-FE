import styled from "styled-components";
import { FontStyles } from "../../../../styles";

export const Container = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width || "100%"};
  ${FontStyles.XS_Medium};
`;

export const Label = styled.label`
  ${FontStyles.SM_Regular};
  margin-bottom: 5px;
`;
