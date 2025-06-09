import styled from "styled-components";
import { Colors, FontStyles } from "../../../styles";

export const ToastBox = styled.div`
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${Colors.Main10};
  color: #fff;
  padding: 8px 15px;
  border-radius: 8px;
  white-space: nowrap;
  ${FontStyles.SM_SemiBold};
  z-index: 1000;
  animation:
    fadein 0.3s,
    fadeout 0.3s ease-out 1.7s;

  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-10px);
    }
  }
`;
