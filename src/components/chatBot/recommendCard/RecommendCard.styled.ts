import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  width: 220px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
`;

export const FixedButton = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  ${FontStyles.XXS_SemiBold};
  border: 1px solid ${Colors.Grayscale40};
  background-color: ${Colors.Grayscale0};
  padding: 3px 8px;
  border-radius: 20px;
`;

export const Info = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
`;

export const Title = styled.p`
  ${FontStyles.MD2_SemiBold};
`;

export const Name = styled.p`
  ${FontStyles.SM_Medium};
  color: ${Colors.Grayscale70};
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  ${FontStyles.XS_Medium};
  color: ${Colors.Grayscale70};
  span {
    color: ${Colors.Main10};
    ${FontStyles.MD2_Bold};
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  margin: 15px 0px;
`;

export const Component = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${FontStyles.XS_SemiBold};
  color: ${Colors.Grayscale60};
  border-radius: 10px;
  border: 1px solid ${Colors.Grayscale40};
  span {
    color: ${Colors.Grayscale90};
    ${FontStyles.SM_Bold};
  }
`;

export const DateInfo = styled.div`
  display: flex;
  width: 100%;
`;

export const DateComponent = styled.div`
  padding: 10px 0px;
  width: 100%;
  align-items: center;
  border-top: 1px solid ${Colors.Grayscale40};
  border-bottom: 1px solid ${Colors.Grayscale40};
  display: flex;
  flex-direction: column;
  ${FontStyles.XS_SemiBold};
  color: ${Colors.Grayscale60};
  span {
    color: ${Colors.Grayscale90};
    ${FontStyles.SM_Bold};
  }
`;
