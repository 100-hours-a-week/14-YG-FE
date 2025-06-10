import styled from "styled-components";
import MenuButton from "../../../assets/icons/Etc.svg?react";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  position: relative;
  display: flex;
`;

export const StyledMenuButton = styled(MenuButton)`
  cursor: pointer;
  color: ${Colors.Grayscale80};
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  right: 5px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  width: 100px;

  li {
    padding: 5px 16px;
    ${FontStyles.XXS_SemiBold};
    color: ${Colors.Grayscale60};
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
      color: ${Colors.Grayscale90};
    }
  }
`;
