import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";

export const PostDetailContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const TopSection = styled.div`
  margin: 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameInfo = styled.p`
  ${FontStyles.XXS_SemiBold};
`;

export const AccountInfo = styled.p`
  ${FontStyles.XXXS_SemiBold};
  color: ${Colors.Grayscale60};
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
`;

export const TitlePart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const InfoPart = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
`;

export const PostTitle = styled.p`
  ${FontStyles.MD2_SemiBold};
`;

export const Url = styled.a`
  text-decoration: none;
  cursor: default;
  display: inline; // 핵심! 텍스트만큼만 영역
`;

export const ProductTitle = styled.span`
  ${FontStyles.SM_SemiBold};
  color: ${Colors.Grayscale70};
`;

export const UrlTitle = styled(ProductTitle)`
  cursor: pointer;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 20px;
`;

export const PickupDate = styled.p`
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Grayscale60};
  white-space: nowrap; // ✅ 강제 줄바꿈 방지
`;

export const unitPrice = styled.p`
  ${FontStyles.SM_SemiBold};
  color: ${Colors.Main30};
`;

export const unitAmount = styled.p`
  ${FontStyles.XXS_Medium};
  color: ${Colors.Grayscale60};
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: end;
`;

export const OrderButton = styled.button<{ $isCancel: boolean }>`
  ${FontStyles.SM_SemiBold};
  padding: 3px 7px;
  border: none;
  border-radius: 5px;
  background-color: ${({ $isCancel }) =>
    $isCancel ? Colors.Main30 : Colors.Main10};
  color: ${Colors.Grayscale0};
  margin-bottom: 5px;
  cursor: pointer;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }

  &:disabled {
    background-color: ${Colors.Grayscale60};
    cursor: default;
    transform: none;
  }
`;

export const Ddate = styled.p`
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Main10};
  white-space: nowrap; // ✅ 강제 줄바꿈 방지
  margin-top: 3px;
`;

export const DetailPart = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const SectionDivider = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 15px;
`;

export const SectionName = styled.p`
  ${FontStyles.XS_SemiBold}
  width: fit-content;
  flex-shrink: 0; // ✅ 줄바꿈 방지
  white-space: nowrap; // ✅ 강제 줄바꿈 방지
`;

export const GoChat = styled.button`
  margin-top: 15px;
  border: none;
  background-color: ${Colors.Grayscale10};
  color: ${Colors.Grayscale60};
  ${FontStyles.SM_SemiBold};
  padding: 5px;
  transition: transform 0.2s all;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    background-color: ${Colors.Web10};
    color: ${Colors.Grayscale80};
  }
`;

export const DetailInfo = styled.div`
  ${FontStyles.SM_Medium};
  white-space: pre-wrap;
  margin-top: 10px;
`;

export const PostDate = styled.p`
  display: flex;
  justify-content: end;
  color: ${Colors.Grayscale60};
  ${FontStyles.XXXS_SemiBold};
  margin-top: 30px;
`;
