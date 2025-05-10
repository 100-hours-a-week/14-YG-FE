import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommonSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 20px 30px;
  cursor: pointer;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
`;

export const OrderState = styled.p`
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Grayscale80};
`;

export const productInfo = styled.div``;

export const pickupPlace = styled.p`
  ${FontStyles.XXXS_SemiBold}
  color: ${Colors.Grayscale60};
`;

export const unitPrice = styled.p`
  ${FontStyles.XS_SemiBold}
`;

export const postTitle = styled.p`
  ${FontStyles.XS_Regular};
  color: ${Colors.Grayscale60};
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: 5px;
`;

export const MyOrder = styled.p`
  ${FontStyles.XXS_SemiBold}
  display:flex;
  align-items: center;
  gap: 3px;
  color: ${Colors.Grayscale80};
`;

export const TotalAmount = styled.p`
  display: flex;
  justify-content: end;
  ${FontStyles.XXS_Bold}
`;

export const ButtonSection = styled.div``;
