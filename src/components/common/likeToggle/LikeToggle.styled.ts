import styled from "styled-components";

export const LikeToggleButton = styled.img<{ $imageType: "normal" | "full" }>`
  position: absolute;
  right: ${({ $imageType }) => ($imageType === "full" ? "10px" : "5px")};
  bottom: ${({ $imageType }) => ($imageType === "full" ? "10px" : "5px")};
  cursor: pointer;
  width: ${({ $imageType }) => ($imageType === "full" ? "20px" : "15px")};
  height: ${({ $imageType }) => ($imageType === "full" ? "20px" : "15px")};
`;
