import { useModalStore } from "../../../../stores/useModalStore";
import * as S from "./RefundNoticeModal.styled";

const RefundNoticeModal = () => {
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <S.Container>
      <S.StyledXIcon onClick={closeModal} />
      야야안녕
    </S.Container>
  );
};

export default RefundNoticeModal;
