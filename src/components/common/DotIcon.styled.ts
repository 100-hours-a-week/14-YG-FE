import styled from "styled-components";
import { Colors } from "../../styles";

export const DotIcon = styled.span`
  display: block;
  width: 2px;
  height: 2px;
  background-color: ${Colors.Grayscale60};
  border-radius: 50%;
  margin-right: 4px;
  flex-shrink: 0; // ✅ 점은 줄어들지 않게
  margin-top: 6px; // ✅ 첫 줄 텍스트와 수직 정렬
`;
