import styled from "styled-components";
import { Colors } from "./styles";

export const Whole = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.Web10};
  overflow: hidden;
  justify-content: center;
  display: flex;
  gap: 100px;
  @media (max-width: 1140px) {
    justify-content: space-between;
    gap: 0px;
  }
`;

export const MainContainer = styled.div`
  width: 390px;
  height: 100vh;
  background-color: ${Colors.Grayscale0};
  display: flex;
  flex-direction: column;
  position: relative;
  @media (max-width: 1040px) {
    margin: 0 auto;
  }
  @media (max-width: 390px) {
    width: 100%;
  }
`;

// ✅ 여기서 스크롤만 담당
export const ScrollArea = styled.div<{ $modalOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: ${({ $modalOpen }) => ($modalOpen ? "hidden" : "auto")};
`;
