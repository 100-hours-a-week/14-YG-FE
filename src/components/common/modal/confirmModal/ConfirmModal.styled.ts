import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";

export const Container = styled.div`
  background-color: ${Colors.Grayscale0};
  width: 350px;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Message = styled.p`
  margin-top: 5px;
  ${FontStyles.MD1_SemiBold}
`;

export const Sub = styled.p`
  ${FontStyles.SM_Medium};
  color: ${Colors.Grayscale60};
  text-align: center;
  line-height: 1.2;
  margin: 15px 0px;
  > span {
    color: ${Colors.Main30};
  }
`;

export const Info = styled.p<{ $isSub: boolean }>`
  ${({ $isSub }) =>
    $isSub ? FontStyles.XXS_SemiBold : FontStyles.XXS_Regular};
  color: ${Colors.Grayscale60};
`;

export const ButtonPart = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 15px;
`;
