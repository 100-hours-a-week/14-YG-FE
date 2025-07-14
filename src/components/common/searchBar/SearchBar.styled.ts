import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SearchLine = styled.div`
  flex: 1;
  border-top: 1px solid ${Colors.Main10};
`;

export const SearchBox = styled.div`
  width: 100%;
  border: 1px solid ${Colors.Main10};
  width: 240px;
  border-radius: 50px;
  padding: 7px 15px;
  display: flex;
  justify-content: space-between;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
`;

export const SearchText = styled.input`
  width: 185px;
  ${FontStyles.XS_Medium};
  border: none;
  outline: none;

  &::placeholder {
    color: ${Colors.Grayscale50};
  }
`;

export const SearchIcon = styled.img`
  width: 17px;
  cursor: pointer;
`;
