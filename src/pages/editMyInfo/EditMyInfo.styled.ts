import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";

export const SectionInfo = styled.div`
  ${FontStyles.SM_Regular}
  color: ${Colors.Grayscale60};
  text-align: center;
  > span {
    color: ${Colors.Main30};
  }
  margin: 20px 0px;
`;

export const AccountInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  ${FontStyles.SM_Regular};
  gap: 5px;
`;

export const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const InfoBox = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${Colors.Grayscale50};
  color: ${Colors.Grayscale60};
  ${FontStyles.SM_Regular};
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  > p > span {
    color: ${Colors.Grayscale80};
  }
`;
