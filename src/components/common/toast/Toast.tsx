import { useToastStore } from "../../../stores/useToastStore";
import * as S from "./Toast.styled";

const Toast = () => {
  const { message, isVisible } = useToastStore();

  if (!isVisible) return null;
  return <S.ToastBox>{message}</S.ToastBox>;
};

export default Toast;
