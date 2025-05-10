import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.button`
  width: 35px;
  height: 45px;
  ${FontStyles.LG_Bold}
  border-radius: 20px;
  border: 1px solid ${Colors.Grayscale50};
  background-color: ${Colors.Grayscale0};
  color: ${Colors.Main10};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.Main50};
  }
`;

export const Count = styled.div`
  width: fit-content;
  ${FontStyles.MD2_Regular}
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.Main50};
  color: ${Colors.Grayscale60};
  padding: 3px 5px;
`;
