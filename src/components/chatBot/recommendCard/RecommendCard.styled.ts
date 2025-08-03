import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  width: 220px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  height: 100%;
  cursor: pointer;
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
  ${FontStyles.SM_SemiBold};
  line-height: 1.4; /* 예시: 1.2em */
  height: calc(1.4em * 2); /* 2줄 높이 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`;

export const Name = styled.p`
  ${FontStyles.XS_Medium};
  color: ${Colors.Grayscale70};
  line-height: 1.4;
  height: calc(1.4em * 2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  ${FontStyles.XXS_Medium};
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
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Grayscale60};
  border-radius: 10px;
  border: 1px solid ${Colors.Grayscale40};
  span {
    color: ${Colors.Grayscale90};
    ${FontStyles.XS_Bold};
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
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Grayscale60};
  span {
    color: ${Colors.Grayscale90};
    ${FontStyles.XS_Bold};
  }
`;
