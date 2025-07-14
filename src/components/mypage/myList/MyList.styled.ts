import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  margin-bottom: 50px;
`;

export const FilteringSection = styled.div`
  margin: 20px 30px 5px 30px;
`;

export const TopButton = styled.div`
  display: flex;
  gap: 10px;
`;

export const WhiteButton = styled.button`
  ${FontStyles.XS_SemiBold};
  border: 1px solid ${Colors.Grayscale40};
  background-color: ${Colors.Grayscale0};
  width: 150px;
  height: 25px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${Colors.Main10};
    color: ${Colors.Grayscale0};
  }
`;

export const EndButton = styled.button`
  ${FontStyles.SM_SemiBold};
  background-color: ${Colors.Grayscale80};
  color: ${Colors.Grayscale0};
  border: none;
  align-self: center;
  width: 90%;
  height: 25px;
  border-radius: 4px;
  cursor: pointer;
`;
