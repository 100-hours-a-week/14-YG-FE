import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";
import SendButton from "../../assets/icons/Send.svg?react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

export const ChatPart = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 15px;
`;

export const RowScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 30px;
  margin: 10px 0px;
`;

export const Message = styled.div<{ $isUser?: boolean }>`
  display: flex;
  max-width: 90%;
  gap: 5px;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
`;

export const StyledMoong = styled.img<{ $isUser?: boolean }>`
  width: 50px;
  height: 50px;
  display: ${({ $isUser }) => $isUser && "none"};
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MessageBubble = styled.div<{ $isUser?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ $isUser }) =>
    $isUser ? Colors.Grayscale0 : Colors.Web10};
  margin: 6px 0;
  padding: 10px 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  ${FontStyles.SM_Medium};
  border-radius: 16px;
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
  border: none;
  outline: none;
  &::placeholder {
    ${FontStyles.SM_Medium};
  }
`;

export const StyledSendButton = styled(SendButton)`
  cursor: pointer;
`;
export const StructuredCardWrapper = styled.div`
  background-color: white;
  width: 90%;
  padding: 16px;
  margin: 10px 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  ${FontStyles.MD2_Medium};
`;

export const CardHeader = styled.h4`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const OutroText = styled.div`
  background-color: ${Colors.Grayscale20};
  ${FontStyles.SM_SemiBold};
  color: ${Colors.Grayscale60};
  margin: -16px;
  margin-top: 20px;
  padding: 10px;
`;

export const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -25px;

  span {
    display: inline-block;
    vertical-align: middle;
    animation: blink 1.4s infinite both;
    color: ${Colors.Main10};
    font-size: 50px;
    margin: 0 1px;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;
