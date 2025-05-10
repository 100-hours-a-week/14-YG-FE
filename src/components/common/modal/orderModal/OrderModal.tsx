import * as S from "./OrderModal.styled";
import Modal from "../Modal";
import { useModalStore } from "../../../../stores/useModalStore";
import SelectButtonInput from "../../input/selectButtonInput/SelectButtonInput";
import { useState } from "react";
import InputField from "../../input/inputField/InputField";
import AgreeCheckBox from "../../agreeCheckbox/AgreeCheckBox";
import { DotIcon } from "../../DotIcon.styled";
import Button from "../../button/Button";
import { SectionLine } from "../../SectionLine.styled";
import { useOrderStore } from "../../../../stores/useOrderStore";
import { useUserStore } from "../../../../stores/useUserStore";
import { useOrderMutation } from "../../../../hooks/mutations/order/useOrderMutation";

const OrderModal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const { user } = useUserStore();
  const [payerName, setPayerName] = useState(user?.name || "");

  const {
    postId,
    productName,
    unitPrice,
    unitAmount,
    leftAmount,
    hostAccountBank,
    hostAccountNumber,
  } = useOrderStore();

  const [quantity, setQuantity] = useState(unitAmount);
  const totalPrice = quantity * unitPrice;
  const { mutate: orderMutate } = useOrderMutation(postId);

  const handleOrder = () => {
    orderMutate({
      postId,
      price: totalPrice,
      quantity,
      name: payerName,
    });
  };

  return (
    <Modal onClose={closeModal}>
      <S.Container>
        <S.CloseButton onClick={closeModal} />
        <S.ContainerLabel>수량 선택</S.ContainerLabel>
        <SectionLine />
        <S.Name>{productName}</S.Name>
        <S.MainPart>
          <S.SelectAmount>
            <S.Label>수량선택</S.Label>
            <S.UnitAmount>
              <S.StyledOpenBox />
              주문단위: {unitAmount}
            </S.UnitAmount>
            <S.AboutPrice>
              <SelectButtonInput
                unit={unitAmount}
                max={leftAmount}
                onChange={setQuantity}
              />
              <S.PriceInfo>
                <S.Info>(개)당 금액</S.Info>
                <S.Price>{unitPrice.toLocaleString()}원</S.Price>
              </S.PriceInfo>
            </S.AboutPrice>
          </S.SelectAmount>
          <S.TotalInfo>
            <S.AmountInfo>
              <S.Label>총 수량</S.Label>
              <S.Amount>{quantity}개</S.Amount>
            </S.AmountInfo>
            <S.PriceInfo>
              <S.Info>총 금액</S.Info>
              <S.TotalPrice>{totalPrice.toLocaleString()}원</S.TotalPrice>
            </S.PriceInfo>
          </S.TotalInfo>
          <S.AccountInfo>
            <S.Label>계좌이체</S.Label>
            <S.Account>
              주최자 계좌번호: {hostAccountBank} {hostAccountNumber}
            </S.Account>
            <InputField
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              placeholder="입금자명을 입력해주세요."
            />
            <S.Guide>
              <DotIcon />
              입금자명은 수령 시 확인 가능한 본인 이름으로 입력해주세요. <br />
              <DotIcon />
              주최자 계좌번호로 입금이 완료되어야 공구 참여자로 진행되며 1일
              이내에 결제되지 <br />
              않으면 주문이 취소됩니다.
            </S.Guide>
            <AgreeCheckBox
              label="환불 방법"
              message="본인 계좌 환불"
              checked={true}
            />
          </S.AccountInfo>
        </S.MainPart>
        <Button buttonStyle="square" onClick={handleOrder}>
          주문
        </Button>
      </S.Container>
    </Modal>
  );
};

export default OrderModal;
