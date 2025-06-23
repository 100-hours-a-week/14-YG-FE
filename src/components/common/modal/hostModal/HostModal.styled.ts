import styled from "styled-components";
import { Colors, FontStyles } from "../../../../styles";
import XIcon from "../../../../assets/icons/XIcon.svg?react";

export const Container = styled.div`
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Colors.Grayscale0};
  border-radius: 20px;
  border: none;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  gap: 10px;

  > button {
    margin-top: 10px;
  }
`;

export const StyledXIcon = styled(XIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const Label = styled.label`
  ${FontStyles.MD1_SemiBold};
`;

export const Ment = styled.p`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 20px;
`;

export const StyledText = styled.p`
  ${FontStyles.XXS_Regular};
  color: ${Colors.Grayscale60};
  line-height: 15px;
  margin-left: 2px;
`;

export const ListLabel = styled.label`
  ${FontStyles.SM_SemiBold};
`;

export const TableWrapper = styled.div`
  border: 1px solid ${Colors.Grayscale50};
  border-radius: 10px;
  width: 340px;
  padding: 15px 10px 0px 10px;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Th = styled.th`
  ${FontStyles.XXS_SemiBold};
  text-align: center;
  vertical-align: middle;
  color: ${Colors.Grayscale60};
  border-bottom: 1px solid ${Colors.Grayscale50}; // ✅ 줄
  padding-bottom: 8px;
  box-sizing: border-box;
`;

export const Td = styled.td<{ $isCanceled?: boolean }>`
  ${FontStyles.XXS_SemiBold};
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid ${Colors.Grayscale40}; // ✅ 줄
  /* ✅ 마지막 tr의 모든 td에는 줄 없애기 */
  tr:last-of-type & {
    border-bottom: none;
  }
  ${({ $isCanceled }) =>
    $isCanceled &&
    `
      color: ${Colors.Grayscale60};
      text-decoration: line-through;
    `}
`;

export const AccountButton = styled.button`
  ${FontStyles.XXS_SemiBold};
  color: ${Colors.Main10};
  border: 1px solid ${Colors.Grayscale40};
  background-color: ${Colors.Web10};
  padding: 2px 8px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Tr = styled.tr``;

export const ScrollBody = styled.div`
  max-height: 150px;
  overflow-y: auto;
  margin: 3px -4px 3px 0px;

  /* 스크롤바 전체 (높이/두께 지정) */
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* 스크롤바 트랙 (배경) */
  &::-webkit-scrollbar-track {
    background: ${Colors.Grayscale40};
    border-radius: 12px;
  }

  /* 스크롤바 썸(움직이는 막대) */
  &::-webkit-scrollbar-thumb {
    background: ${Colors.Grayscale90};
    border-radius: 12px;
  }

  /* 테이블 안에서 border-collapse 유지 */
  table {
    width: 100%;
    border-collapse: collapse;
  }
`;
