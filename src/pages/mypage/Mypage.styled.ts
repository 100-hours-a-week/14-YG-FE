import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";

export const MypageContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PageName = styled.p`
  ${FontStyles.MD1_Bold};
  margin: 15px 30px;
`;

export const ProfileSection = styled.div`
  border: 1px solid ${Colors.Grayscale50};
  border-radius: 10px;
  padding: 20px;
  margin: 0px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  > button {
    align-self: center;
    width: 100%;
    ${FontStyles.XS_Medium};
  }
`;

export const DeleteUser = styled.p`
  margin-top: auto;
  padding-bottom: 20px;
  width: fit-content;
  align-self: center;
  justify-content: end;
  color: ${Colors.Grayscale60};
  ${FontStyles.MD2_Regular};
  text-decoration: underline;
  cursor: pointer;
`;
