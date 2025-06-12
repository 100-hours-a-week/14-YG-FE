import styled from "styled-components";
import { Colors } from "../../../../styles";
import RightArrow from "../../../../assets/icons/RightArrow.svg?react";
import LeftArrow from "../../../../assets/icons/LeftArrow.svg?react";

export const ImageSliderContainer = styled.div`
  position: relative;
  border-radius: 10px;
  border: none;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
  gap: 10px;
`;

export const ImagePart = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const StyledLeftArrow = styled(LeftArrow)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: background-color 0.1s;
  cursor: pointer;
  color: ${Colors.Grayscale60};
  &:hover {
    color: ${Colors.Grayscale90};
  }
`;

export const StyledRightArrow = styled(RightArrow)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  transition: background-color 0.1s;
  cursor: pointer;
  color: ${Colors.Grayscale60};
  &:hover {
    color: ${Colors.Grayscale90};
  }
`;

export const SlideIcon = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

export const Indicator = styled.div<{ $isSelected: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ $isSelected }) =>
    $isSelected ? Colors.Main10 : Colors.Grayscale40};
  transition: background-color 0.3s;
`;
