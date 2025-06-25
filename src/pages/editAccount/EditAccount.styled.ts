import styled from "styled-components";
import { FontStyles } from "../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin: 15px 0px;
  gap: 20px;
  width: 272px;
  align-self: center;
  justify-content: center;
`;

export const SectionName = styled.p`
  ${FontStyles.MD2_Bold};
  align-self: center;
`;
