import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";

export const Container = styled.div<{ $isMyMessage?: boolean }>`
  display: flex;
  flex-direction: ${({ $isMyMessage }) =>
    $isMyMessage ? "row-reverse" : "row"};
  margin: 10px;
  gap: 10px;
`;

export const ProfileImg = styled.img<{ $hidden?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
`;

export const MessagePart = styled.div<{ $isMyMessage?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: ${({ $isMyMessage }) =>
    $isMyMessage ? "flex-end" : "flex-start"};
`;

export const Nickname = styled.p`
  ${FontStyles.SM_SemiBold};
`;

export const Message = styled.div<{ $isMyMessage?: boolean }>`
  background-color: ${Colors.Grayscale10};
  ${FontStyles.SM_Regular};
  width: fit-content;
  padding: 5px 8px;
  border-radius: ${({ $isMyMessage }) =>
    $isMyMessage ? "16px 0px 16px 16px" : "0px 16px 16px 16px"};
  white-space: pre-line;
`;
