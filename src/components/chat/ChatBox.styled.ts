import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";

export const Container = styled.div`
  display: flex;
  margin: 10px;
  gap: 7px;
`;

export const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MessagePart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Nickname = styled.p`
  ${FontStyles.SM_SemiBold};
`;

export const Message = styled.div`
  background-color: ${Colors.Grayscale10};
  ${FontStyles.SM_Regular};
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
`;
