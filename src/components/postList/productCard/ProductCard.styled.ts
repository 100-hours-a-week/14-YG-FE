import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
  cursor: pointer;
`;

export const Title = styled.p`
  ${FontStyles.MD2_SemiBold};
`;

export const Date = styled.p`
  ${FontStyles.XXXS_Regular};
  color: ${Colors.Grayscale60};
`;

export const ProductName = styled.p`
  ${FontStyles.SM_Medium};
  color: ${Colors.Grayscale70};
  margin-top: 10px;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const PriceInfo = styled.p`
  ${FontStyles.SM_SemiBold};
  color: ${Colors.Main30};

  > span {
    ${FontStyles.XXXS_Medium};
    color: ${Colors.Grayscale60};
  }
`;
