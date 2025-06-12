import styled from "styled-components";
import { Colors } from "../../../styles";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${Colors.Grayscale30};
  margin: 0px 30px;
`;

export const TabButton = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  padding: 10px 0;
  font-weight: ${({ $isSelected }) => ($isSelected ? "700" : "500")};
  color: ${({ $isSelected }) =>
    $isSelected ? Colors.Main10 : Colors.Grayscale60};
  border: none;
  border-bottom: ${({ $isSelected }) =>
    $isSelected ? `2px solid ${Colors.Main10}` : "none"};
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.85;
  }
`;
