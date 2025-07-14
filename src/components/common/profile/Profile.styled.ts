import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const ProfilePart = styled.div<{ $type: "mypage" | "post" }>`
  display: flex;
  align-items: center;
  gap: ${({ $type }) => ($type === "mypage" ? "15px" : "10px")};
`;

export const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const LogoutButton = styled.button`
  background-color: ${Colors.Grayscale40};
  color: ${Colors.Grayscale0};
  border: none;
  border-radius: 10px;
  width: 60px;
  height: 20px;
  ${FontStyles.XS_Medium};
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${Colors.Main10};
  }
`;

export const NameInfo = styled.p<{ $type: "mypage" | "post" }>`
  ${({ $type }) =>
    $type === "mypage" ? FontStyles.SM_Bold : FontStyles.XXS_Bold};
`;

const SubText = styled.p`
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Grayscale60};
`;

export const RealName = styled(SubText)``;
export const Email = styled(SubText)``;
export const PhoneNumber = styled(SubText)``;

export const AccountInfo = styled.div<{ $type: "mypage" | "post" }>`
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Grayscale60};
  display: flex;
  align-items: center;
`;

export const SecretBox = styled.div`
  background-color: ${Colors.Grayscale10};
  width: 150px;
  margin-left: 5px;
  padding: 3px;
`;

export const Ment = styled.p`
  text-align: center;
  color: ${Colors.Grayscale50};
`;

export const CopyButton = styled.button`
  ${FontStyles.XXXS_SemiBold};
  margin-left: 5px;
  border-radius: 10px;
  border: 1px solid ${Colors.Main10};
  color: ${Colors.Main10};
  padding: 1px 4px;
  background-color: ${Colors.Grayscale0};
  cursor: pointer;

  &:disabled {
    border: 1px solid ${Colors.Grayscale40};
    color: ${Colors.Grayscale50};
    cursor: default;
  }
`;
