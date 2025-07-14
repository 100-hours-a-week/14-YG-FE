import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";
import OpenBox from "../../../../assets/icons/OpenBox.svg?react";
import DownArrow from "../../../../assets/icons/DownArrow.svg?react";

export const Container = styled.div`
  background-color: ${Colors.Grayscale10};
  width: 100%;
  padding: 10px 30px 20px 30px;
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 0px 0px;
  align-items: center;
`;

export const CloseButton = styled(DownArrow)`
  color: ${Colors.Grayscale90};
  cursor: pointer;
`;

export const ContainerLabel = styled.label`
  ${FontStyles.LG_Bold};
  align-items: left;
  width: 100%;
  margin-bottom: 10px;
`;

export const Name = styled.p`
  ${FontStyles.MD2_SemiBold};
  color: ${Colors.Grayscale70};
  margin: 20px 0px;
`;

export const MainPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const SelectAmount = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid ${Colors.Grayscale40};
  background-color: ${Colors.Grayscale0};
`;

export const Label = styled.label`
  ${FontStyles.MD2_SemiBold};
`;

export const UnitAmount = styled.div`
  display: flex;
  align-items: center;
  ${FontStyles.XXXS_Regular};
  color: ${Colors.Grayscale60};
`;

export const StyledOpenBox = styled(OpenBox)`
  width: 10px;
  height: 10px;
  margin-right: 3px;
`;

export const AboutPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const PriceInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Info = styled.p`
  ${FontStyles.XS_Medium};
  color: ${Colors.Grayscale60};
`;

export const Price = styled.p`
  ${FontStyles.SM_Bold};
`;

export const TotalInfo = styled(SelectAmount)`
  border-top: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AmountInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Amount = styled.p`
  ${FontStyles.MD2_Regular};
  color: ${Colors.Main30};
`;

export const TotalPrice = styled(Price)`
  color: ${Colors.Main30};
`;

export const AccountInfo = styled(SelectAmount)`
  border-top: none;
  > input {
    border-radius: 0px;
  }
`;

export const Account = styled.p`
  ${FontStyles.XXXS_SemiBold};
  color: ${Colors.Grayscale60};
  margin-bottom: 10px;
`;

export const Guide = styled.p`
  margin: 5px 0px;
  ${FontStyles.XXXS_Regular};
  color: ${Colors.Grayscale60};
`;

export const StyledText = styled.p`
  ${FontStyles.XXXS_Regular};
  color: ${Colors.Grayscale60};
  line-height: 15px;
`;
