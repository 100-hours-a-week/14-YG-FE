import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";
import User from "../../../../assets/icons/User.svg?react";
import Camera from "../../../../assets/icons/Camera.svg?react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const Input = styled.input`
  display: none;
`;

export const ImageBox = styled.div<{ $styleType: "circle" | "rect" }>`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: ${({ $styleType }) =>
    $styleType === "circle" ? "50%" : "8px"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.Grayscale0};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: ${({ $styleType }) =>
      $styleType === "circle" ? "50%" : "8px"};
    object-fit: cover;
    object-position: center;
    display: block;
  }
`;

export const StyledUser = styled(User)`
  width: 50px;
  height: 50px;
  stroke-width: 1px;
`;

export const StyledCamera = styled(Camera)`
  position: absolute;
  cursor: pointer;
  right: 0px;
  bottom: 3px;
`;

export const HelperText = styled.span`
  color: red;
  font-size: 12px;
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 45px;
  left: 85px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  width: 100px;
  z-index: 1000;

  li {
    padding: 5px 16px;
    ${FontStyles.XS_Medium};
    color: ${Colors.Grayscale60};
    cursor: pointer;
    width: 100%;

    &:hover {
      background: #f2f2f2;
      color: ${Colors.Grayscale90};
    }
  }
`;
