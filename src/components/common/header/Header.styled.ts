import styled from "styled-components";
import User from "../../../assets/icons/User.svg?react";
import GoBackIcon from "../../../assets/icons/GoBack.svg?react";
import { FontStyles } from "../../../styles";

export const HeaderContainer = styled.div`
  position: relative;
  height: 54px;
  display: flex;
  align-items: center;
`;

export const GoBack = styled(GoBackIcon)`
  margin-left: 20px;
  cursor: pointer;
`;

export const LogoPart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  ${FontStyles.MD1_SemiBold};
`;

export const ServiceName = styled.img`
  width: 100px;
`;

export const SidePart = styled.div`
  display: flex;
  margin-left: auto;
  padding: 20px;
  align-items: center;
  gap: 10px;
`;

export const AlertIcon = styled.img`
  width: 24px;
  cursor: pointer;
`;

export const ProfileIcon = styled(User)`
  width: 24px;
  cursor: pointer;
  stroke-width: 2px;
`;
