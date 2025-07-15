import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";
import SendButton from "../../assets/icons/Send.svg?react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const ChatPart = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 15px;
`;

export const StyledMoong = styled.img``;

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
  border: none;
  outline: none;
  &::placeholder {
    ${FontStyles.SM_Medium};
  }
`;

export const StyledSendButton = styled(SendButton)`
  cursor: pointer;
`;
