import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";

export const Container = styled.div`
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Colors.Grayscale0};
  border-radius: 20px;
  border: none;
  width: 300px;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  > button {
    width: 135px;
  }
`;

export const Box = styled.img`
  width: 52px;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content; // ✅ 이게 핵심
  gap: 5px;
`;

export const OrderInfo = styled.div`
  border: 1px solid ${Colors.Grayscale50};
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Product = styled.p`
  color: ${Colors.Grayscale70};
  ${FontStyles.XS_SemiBold};
  overflow: hidden; // 넘친 내용 숨기기
  text-overflow: ellipsis; // 말줄임표로 표시
  white-space: nowrap; // 줄 바꿈 없이 한 줄만
`;

export const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  ${FontStyles.XXS_Medium};
  color: ${Colors.Grayscale60};
`;

export const Amount = styled.span`
  ${FontStyles.XXS_Medium};
  color: ${Colors.Grayscale60};
`;

export const Price = styled(Amount)`
  color: ${Colors.Main30};
`;

export const Ment = styled.p`
  ${FontStyles.MD1_SemiBold};
`;

export const AccountPart = styled.div`
  border: 1px solid ${Colors.Grayscale50};
  border-radius: 10px;
  padding: 10px 15px;
  background-color: ${Colors.Grayscale10};
  display: flex;
  justify-content: center;
  width: fit-content;
  min-width: 210px;
`;

export const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Account = styled.p`
  max-width: 215px;
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Grayscale60};

  > span {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: ${Colors.Grayscale90};
    }
  }
`;

export const Name = styled.p`
  ${FontStyles.XXS_Medium};

  > span {
    color: ${Colors.Grayscale60};
  }
`;

export const Info = styled.p`
  ${FontStyles.XXS_Regular};
  color: ${Colors.Grayscale60};
  text-align: center;
  > span {
    ${FontStyles.XXS_Bold};
  }
`;
