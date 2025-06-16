import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";
import SendButton from "../../assets/icons/Send.svg?react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatPart = styled.div`
  //flex: 1;
`;

export const MessagePart = styled.div`
  margin: 30px;
  padding: 15px 20px;
  border: 1px solid ${Colors.Main10};
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

export const MessageBox = styled.textarea`
  flex: 1;
  resize: none;
  //border: none;
  &::placeholder {
    ${FontStyles.SM_Medium};
  }
`;

export const StyledSendButton = styled(SendButton)``;
