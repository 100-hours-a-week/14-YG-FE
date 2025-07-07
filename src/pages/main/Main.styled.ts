import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";

export const Anounce = styled.div`
  display: flex;
  background-color: ${Colors.Web10};
  margin: 20px;
  border: none;
  border-radius: 10px;
  padding: 5px;
  align-items: start;
  justify-content: center;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
`;

export const Img = styled.img`
  display: flex;
  justify-content: start;
  width: 70px;
  margin-left: -10px;
`;

export const Ment = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;

export const Title = styled.p`
  ${FontStyles.MD2_SemiBold};
`;

export const Info = styled.p`
  ${FontStyles.XS_Regular};
  color: ${Colors.Grayscale60};
`;

export const NoUnderlineLink = styled.a`
  margin-top: 10px;
  text-decoration: none;
  > button {
    width: 100%;
    font-size: 14px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
