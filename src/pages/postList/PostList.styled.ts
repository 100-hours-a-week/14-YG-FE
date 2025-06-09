import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";
import CheckBox from "../../assets/icons/CheckBox.svg?react";
import NonCheckBox from "../../assets/icons/NonCheckBox.svg?react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FilteringContainer = styled.div`
  margin: 15px 20px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Count = styled.p`
  ${FontStyles.XXS_Regular};
  color: ${Colors.Grayscale60};
  margin: 0px 20px 5px 20px;
  align-self: end;
`;

export const SelectBox = styled.div`
  ${FontStyles.XS_Medium};
  color: ${Colors.Grayscale60};
  display: flex;
  align-items: center;
  align-self: flex-end;
  cursor: pointer;
`;

export const StyledCheckBox = styled(CheckBox)`
  width: 24px;
  height: 24px;
`;

export const StyledNonCheckBox = styled(NonCheckBox)`
  width: 24px;
  height: 24px;
`;

export const ScrollWrapper = styled.div`
  overflow-y: auto;
  min-height: 120vh; // 💡 최소 화면보다 조금 더 길게 보장
`;

export const EmptySearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex: 1;
  justify-content: center;
`;

export const Ment = styled.p`
  ${FontStyles.MD2_Regular};
  color: ${Colors.Main10};
`;
