import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  border: 1px solid ${Colors.Grayscale50};
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  margin: 8px 0px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  ${FontStyles.SM_Regular};
  gap: 5px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Button = styled.button`
  margin-top: 5px;
  background-color: ${Colors.Grayscale80};
  ${FontStyles.XS_Medium};
  color: ${Colors.Grayscale0};
  border: none;
  width: 50%;
  align-self: center;
  border-radius: 20px;
  height: 30px;
  cursor: pointer;

  &:disabled {
    color: ${Colors.Grayscale60};
    background-color: ${Colors.Grayscale40};
    cursor: default;
  }
`;
