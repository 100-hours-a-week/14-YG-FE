import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.Grayscale40};
  padding: 15px;
  border-radius: 15px;
  width: 220px;
  height: 100px;
  cursor: pointer;
`;

export const Top = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
`;

export const Seq = styled.div`
  background-color: ${Colors.Main10};
  width: 30px;
  height: 30px;
  color: ${Colors.Grayscale0};
  ${FontStyles.MD2_Bold};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const Name = styled.p`
  ${FontStyles.MD1_Bold};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const Price = styled.p`
  align-self: flex-end;
  ${FontStyles.MD1_Bold};
  color: ${Colors.Main10};
`;
