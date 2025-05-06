import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";

export const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputLabel = styled.label<{
  $styleType?: "signup" | "post" | "login";
}>`
  ${({ $styleType }) =>
    $styleType === "signup" ? FontStyles.SM_Regular : FontStyles.MD2_Bold}

  margin-bottom: 5px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Prefix = styled.span`
  position: absolute;
  left: 15px;
  color: ${Colors.Grayscale50};
  ${FontStyles.SM_Regular};
`;

export const Suffix = styled.span`
  position: absolute;
  right: 15px;
  color: ${Colors.Grayscale50};
  ${FontStyles.SM_Regular};
`;

export const InputBox = styled.input<{
  $prefix?: React.ReactNode;
  $suffix?: React.ReactNode;
  $styleType?: "signup" | "post" | "login";
}>`
  width: 100%;
  border-radius: 8px;
  height: 40px;
  border: ${({ $styleType }) =>
    $styleType === "login" ? "none" : `1px solid ${Colors.Grayscale50}`};
  background-color: ${({ $styleType }) =>
    $styleType === "login" ? Colors.Grayscale10 : Colors.Grayscale0};
  padding-left: ${({ $prefix }) => ($prefix ? "30px" : "15px")};
  padding-right: ${({ $suffix }) => ($suffix ? "30px" : "15px")};
  &::placeholder {
    ${FontStyles.XS_Medium};
    color: ${Colors.Grayscale50};
  }
  &:disabled {
    background-color: ${Colors.Grayscale40};
    cursor: default;
    border: none;
  }
  &:disabled::placeholder {
    color: ${Colors.Grayscale60};
  }
`;

export const InputHelperText = styled.p`
  ${FontStyles.XXS_Regular};
  color: ${Colors.Main20};
  margin-top: 2px;
`;
