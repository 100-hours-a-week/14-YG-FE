import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 115px;
  height: 115px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;
