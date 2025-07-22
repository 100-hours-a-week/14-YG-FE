import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";
import Bell from "../../assets/icons/Bell.svg?react";

export const unitNotice = styled.div<{ $isRead: boolean }>`
  padding: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: ${({ $isRead }) =>
    $isRead ? Colors.Grayscale0 : Colors.Grayscale10};
  cursor: pointer;
  &:hover {
    background-color: ${Colors.Main40};
  }
`;

export const StyledIcon = styled(Bell)`
  width: 30px;
  color: ${Colors.Grayscale60};
  flex-shrink: 0;
`;

export const Text = styled.p`
  ${FontStyles.SM_Medium};
  white-space: pre-line;
  word-break: break-word;
`;
