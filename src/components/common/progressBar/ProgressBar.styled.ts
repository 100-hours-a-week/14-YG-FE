import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Label = styled.div`
  ${FontStyles.XS_Medium};
  margin-bottom: 6px;
  color: ${Colors.Grayscale70};
`;

export const BarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
`;

export const BarFill = styled.div<{ ratio: number }>`
  width: ${({ ratio }) => `${ratio * 100}%`};
  height: 100%;
  background-color: ${Colors.Main10};
  transition: width 0.3s ease;
`;
