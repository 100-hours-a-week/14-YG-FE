import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";
import XIcon from "../../../../assets/icons/XIcon.svg?react";
import Kakao from "../../../../assets/icons/Kakao.svg?react";

export const Container = styled.div`
  background-color: ${Colors.Grayscale0};
  display: flex;
  flex-direction: column;
  width: 350px;
  align-items: center;
  gap: 10px;
  padding: 40px 30px;
  border-radius: 20px;
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledXIcon = styled(XIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const LogoPart = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ServiceName = styled.img`
  width: 100px;
`;

export const Label = styled.label`
  ${FontStyles.MD2_Bold};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;

  > button {
    margin-top: 10px;
  }
`;

export const NaviSignup = styled.div`
  ${FontStyles.MD2_SemiBold};
  color: ${Colors.Grayscale60};
  text-decoration: underline;
  cursor: pointer;
`;

export const KakaoLoginButton = styled.button`
  background-color: #fddc3f;
  border: none;
  height: 34px;
  padding: 0px 30px 0px 20px;
  width: 230px;
  border-radius: 20px;
  ${FontStyles.SM_SemiBold};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const KakaoLogo = styled(Kakao)``;
