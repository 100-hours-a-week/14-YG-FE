import styled from "styled-components";
import { FontStyles } from "../../../styles";

export const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const URL = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;
  margin-bottom: -15px;

  > button {
    width: 75px;
    height: 40px;
  }
`;

export const Label = styled.label`
  ${FontStyles.MD2_Bold};
`;

export const AccountPart = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  > button {
    width: 140px;
    ${FontStyles.XS_SemiBold};
    height: 40px;
    border-radius: 25px;
  }
`;

export const Pickup = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
