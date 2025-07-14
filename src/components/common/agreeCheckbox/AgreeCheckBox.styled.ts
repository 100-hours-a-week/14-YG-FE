import styled from "styled-components";
import CheckCircle from "../../../assets/icons/CheckCircle.svg?react";
import NonCheckCircle from "../../../assets/icons/NonCheckCircle.svg?react";
import CheckBox from "../../../assets/icons/CheckBox.svg?react";
import NonCheckBox from "../../../assets/icons/NonCheckBox.svg?react";
import { Colors, FontStyles } from "../../../styles";

export const Wrapper = styled.div<{ $boxStyle?: "circle" | "box" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $boxStyle }) => ($boxStyle === "box" ? "center" : "none")};
  gap: 3px;
  width: 100%;
`;

export const PartName = styled.p`
  color: ${Colors.Main30};
  ${FontStyles.XXS_SemiBold};
  cursor: pointer;
`;

export const Info = styled.p`
  color: ${Colors.Grayscale60};
  ${FontStyles.XXXS_Light};
  line-height: 12px;
  margin-bottom: 3px;
`;

export const Row = styled.div<{ $boxStyle?: "circle" | "box" }>`
  margin-top: ${({ $boxStyle }) => ($boxStyle === "box" ? "0px" : "2px")};
  display: flex;
  gap: 10px;
`;

export const AgreePart = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  width: fit-content;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const StyledCheckCircle = styled(CheckCircle)`
  width: 15px;
  color: ${Colors.Main30};
`;

export const StyledNonCheckCircle = styled(NonCheckCircle)`
  width: 15px;
  color: ${Colors.Grayscale50};
`;

export const StyledCheckBox = styled(CheckBox)`
  width: 35px;
  height: 35px;
  color: ${Colors.Main30};
`;

export const StyledNonCheckBox = styled(NonCheckBox)`
  width: 35px;
  height: 35px;
  color: ${Colors.Grayscale50};
`;

export const LabelText = styled.span`
  ${FontStyles.XXS_Regular};
`;

export const ErrorText = styled.span`
  color: ${Colors.Main20};
  ${FontStyles.XXS_Regular};
`;
