import styled from "styled-components";
import MasterButton from "../../../assets/icons/MasterButton.svg?react";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  position: relative;
  display: flex;
`;

export const StyledMasterButton = styled(MasterButton)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 10;
  cursor: pointer;

  @media (max-width: 390px) {
    right: 20px;
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  bottom: 90px;
  right: 25px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  width: 110px;

  li {
    padding: 5px 16px;
    ${FontStyles.XS_Medium};
    color: ${Colors.Grayscale60};
    cursor: pointer;
    width: 100%;

    &:hover {
      background: ${Colors.Main40};
      color: ${Colors.Grayscale90};
    }
  }
`;
