import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 30px;
`;

export const CommonSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px;
  min-width: 0; // 💡 텍스트 줄바꿈/말줄임과 flex-item 크기 충돌 방지
`;

export const OrderState = styled.p<{ $status: boolean }>`
  ${FontStyles.XS_Bold};
  color: ${({ $status }) => ($status ? Colors.Main30 : Colors.Grayscale80)};
`;

export const ProductInfo = styled.div`
  width: 100%;
`;

export const PickupPlace = styled.p`
  ${FontStyles.XXXS_SemiBold}
  color: ${Colors.Grayscale60};
`;

export const UnitPrice = styled.p`
  ${FontStyles.XS_SemiBold}
`;

export const PostTitle = styled.p`
  ${FontStyles.XS_Regular};
  color: ${Colors.Grayscale60};
  overflow: hidden; // 넘친 내용 숨기기
  text-overflow: ellipsis; // 말줄임표로 표시
  white-space: nowrap; // 줄 바꿈 없이 한 줄만
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: 5px;
`;

export const MyOrder = styled.p`
  ${FontStyles.XXS_SemiBold}
  display:flex;
  align-items: center;
  gap: 3px;
  color: ${Colors.Grayscale80};
`;

export const TotalAmount = styled.p`
  display: flex;
  justify-content: end;
  ${FontStyles.XXS_Bold}
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: center;
`;
