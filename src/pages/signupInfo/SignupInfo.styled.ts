import styled from "styled-components";
import { Colors, FontStyles } from "../../styles";

export const SignupSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin: 15px 0px;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

export const SectionName = styled.p`
  ${FontStyles.MD2_Bold}
`;

export const SectionInfo = styled.p`
  ${FontStyles.XS_Regular}
  color: ${Colors.Grayscale60};
  text-align: center;
  > span {
    color: ${Colors.Main30};
  }
`;

export const SignupForm = styled.form`
  width: 272px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 10px;

  > button {
    margin-top: 10px;
  }
`;
