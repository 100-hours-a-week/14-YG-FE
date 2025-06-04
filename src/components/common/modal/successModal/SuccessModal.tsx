import { useModalStore } from "../../../../stores/useModalStore";
import Modal from "../Modal";
import * as S from "./SuccessModal.styled";
import Box from "../../../../assets/images/Box.png";
import { Button } from "../../button/Button.styled";
import { OrderResponse } from "../../../../types/orderType";
import { useEffect, useRef, useState } from "react";
import { useToastStore } from "../../../../stores/useToastStore";

const SuccessModal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const orderInfo = useModalStore((s) => s.payload) as OrderResponse;
  const [accountWidth, setAccountWidth] = useState<number>(0);
  const accountRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToastStore();

  useEffect(() => {
    if (accountRef.current) {
      setAccountWidth(accountRef.current.offsetWidth);
    }
  }, []);

  const handleCopy = () => {
    if (!orderInfo) return;

    navigator.clipboard
      .writeText(orderInfo.hostAccountNumber)
      .then(() => {
        showToast("계좌번호가 복사되었습니다!");
      })
      .catch(() => {
        alert("복사에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <Modal onClose={closeModal}>
      <S.Container>
        <S.Box src={Box} />
        <S.Ment>주문이 완료되었습니다🎉</S.Ment>
        <S.Main>
          <S.OrderInfo style={{ width: `${accountWidth}px` }}>
            <S.Product>{orderInfo.productName}</S.Product>
            <S.InfoLine>
              <S.Title>주문 수량</S.Title>
              <S.Amount>{orderInfo.quantity}개</S.Amount>
            </S.InfoLine>
            <S.InfoLine>
              <S.Title>총 금액</S.Title>
              <S.Price>{orderInfo.price}원</S.Price>
            </S.InfoLine>
          </S.OrderInfo>
          <S.AccountPart ref={accountRef}>
            <S.AccountWrapper>
              <S.Account>
                주최자 계좌번호 :{" "}
                <span onClick={handleCopy}>
                  {orderInfo.hostAccountBank} {orderInfo.hostAccountNumber}
                </span>
              </S.Account>
              <S.Name>
                <span>예금주 : </span>
                {orderInfo.hostName}
              </S.Name>
            </S.AccountWrapper>
          </S.AccountPart>
        </S.Main>
        <S.Info>
          ⏰ 주문 후 <span>1일 이내</span>에 입금해 주세요. <br />
          ✅ 입금 확인 시 공구 참여가 확정됩니다. <br />❌ 미입금 시 주문은 자동
          취소됩니다.
        </S.Info>
        <Button $buttonStyle="square" onClick={closeModal}>
          확인
        </Button>
      </S.Container>
    </Modal>
  );
};

export default SuccessModal;
