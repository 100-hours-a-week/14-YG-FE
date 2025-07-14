import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";
import Bell from "../../assets/icons/Bell.svg?react";

export const unitNotice = styled.div`
  margin: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StyledIcon = styled(Bell)`
  width: 30px;
  color: ${Colors.Grayscale60};
  flex-shrink: 0;
`;

export const Text = styled.p`
  ${FontStyles.SM_Medium};
  word-break: break-word;
`;
