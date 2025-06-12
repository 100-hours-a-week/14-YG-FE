import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ScrollWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  border-radius: 13px;
  background: ${Colors.Grayscale10};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    padding: 5px;
    object-fit: contain;
  }
`;

export const AddBox = styled(ImageBox)`
  border: none;
  flex-direction: column;
  cursor: pointer;

  div {
    ${FontStyles.XXXS_Medium};
    color: ${Colors.Main10};
  }
`;

export const DeleteBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #4b4b52;
  color: white;
  border-radius: 50%;
  border: none;
  font-size: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.Grayscale90};
  }
`;

export const Label = styled.div`
  position: absolute;
  bottom: 4px;
  color: ${Colors.Grayscale80};
  ${FontStyles.XXXS_SemiBold};
`;
