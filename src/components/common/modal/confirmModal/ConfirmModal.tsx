import * as S from "./ConfirmModal.styled";
import Modal from "../Modal";
import {
  ConfirmPayload,
  useModalStore,
} from "../../../../stores/useModalStore";
import Button from "../../button/Button";
import Alert from "../../../../assets/icons/Alert.svg?react";
interface ConfirmModalProps {
  confirmTitle?: string;
  subDescription?: React.ReactNode;
  confirmDescription?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const store = useModalStore();
  const useStore = !props.confirmTitle; // props 없으면 store 모드로 판단

  const {
    confirmTitle,
    subDescription,
    confirmDescription,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  } = useStore ? ((store.payload || {}) as ConfirmPayload) : props;

  const handleClose = () => {
    onCancel?.();
    if (useStore) store.closeModal();
  };

  const handleConfirm = () => {
    onConfirm?.();
    if (useStore) store.closeModal();
  };

  return (
    <Modal onClose={handleClose}>
      <S.Container>
        <Alert />
        <S.Message>{confirmTitle}</S.Message>
        {subDescription && <S.Sub>{subDescription}</S.Sub>}
        <S.Info $isSub={!subDescription}>{confirmDescription}</S.Info>
        <S.ButtonPart>
          <Button
            onClick={handleClose}
            buttonStyle="square"
            buttonState="cancel"
          >
            {cancelText || "취소"}
          </Button>
          <Button onClick={handleConfirm} buttonStyle="square">
            {confirmText || "확인"}
          </Button>
        </S.ButtonPart>
      </S.Container>
    </Modal>
  );
};

export default ConfirmModal;
