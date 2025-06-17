import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";

export const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputLabel = styled.label<{
  $styleType?: "signup" | "post" | "login" | "checkAccount";
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
  $styleType?: "signup" | "post" | "login" | "checkAccount";
}>`
  width: 100%;
  border-radius: 8px;
  height: 40px;
  border: ${({ $styleType }) =>
    $styleType === "login" ? "none" : `1px solid ${Colors.Grayscale50}`};
  background-color: ${({ $styleType }) =>
    $styleType === "login" ? Colors.Grayscale10 : Colors.Grayscale0};
  color: ${Colors.Grayscale60};
  padding-left: ${({ $prefix }) => ($prefix ? "30px" : "15px")};
  padding-right: ${({ $suffix }) => ($suffix ? "30px" : "15px")};
  &::placeholder {
    ${FontStyles.XS_Medium};
    color: ${Colors.Grayscale50};
  }
  &:hover {
    border: 1px solid ${Colors.Grayscale60};
  }
  &:focus {
    outline: none; // ✅ 기본 outline 제거
    border: 1px solid ${Colors.Grayscale60};
  }
  &:disabled {
    background-color: ${Colors.Grayscale40};
    cursor: default;
    border: none;
  }
  &:disabled::placeholder {
    color: ${Colors.Grayscale60};
  }

  /* 🔥 자동완성 배경색 제거 (크롬 대응) */
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: ${Colors.Grayscale60}; /* 텍스트 색도 지정해줘야 함 */
    transition: background-color 5000s ease-in-out 0s; /* 딜레이로 무효화 */
  }
`;

export const CheckAccountInputBox = styled(InputBox)`
  padding: 10px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${Colors.Grayscale50};

  &:hover {
    border: none;
    border-bottom: 1px solid ${Colors.Grayscale60};
  }

  &:focus {
    border: none;
    border-bottom: 1px solid ${Colors.Grayscale60};
  }

  &:disabled {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${Colors.Grayscale40};
  }
`;

export const InputHelperText = styled.p`
  ${FontStyles.XXS_Regular};
  color: ${Colors.Main20};
  margin-top: 2px;
`;
