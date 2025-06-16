import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const CommonSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  margin: 20px;
`;

export const Title = styled.p`
  ${FontStyles.MD2_SemiBold};
`;

export const Chat = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Message = styled.p`
  ${FontStyles.XXS_Regular};
  color: ${Colors.Grayscale60};
`;

export const ChatCount = styled.span`
  ${FontStyles.XXXS_Bold};
  color: ${Colors.Grayscale0};
  background-color: ${Colors.Main20};
  border-radius: 10px;
  padding: 3px 10px;
`;
