import { useEffect, useState } from "react";
import { useModalStore } from "../../../../stores/useModalStore";
import AgreeCheckBox from "../../agreeCheckbox/AgreeCheckBox";
import DotText from "../../dotText/DotText";
import { SectionLine } from "../../SectionLine.styled";
import Modal from "../Modal";
import * as S from "./HostModal.styled";
import { Button } from "../../button/Button.styled";
import { usePartiListQuery } from "../../../../hooks/queries/usePartiListQuery";
import { usePatchOrderStatusMutation } from "../../../../hooks/mutations/host/usePatchOrderStatusMutation";
import { patchOrderStatusBody } from "../../../../types/hostType";
import ConfirmModal from "../confirmModal/ConfirmModal";
import { useToastStore } from "../../../../stores/useToastStore";
import Colors from "./../../../../styles/Colors";

const HostModal = () => {
  const { closeModal, payload } = useModalStore();
  const postId = (payload as { postId: number })?.postId;
  const { data: participants } = usePartiListQuery(Number(postId));
  const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});
  const [showConfirm, setShowConfirm] = useState<null | number>(null); // orderId 저장
  const showToast = useToastStore((s) => s.showToast);

  const { mutate: patchOrderStatus } = usePatchOrderStatusMutation(
    Number(postId)
  );

  console.log(participants);
  console.log(checkedMap);

  useEffect(() => {
    if (!participants) return;
    const initialMap: Record<number, boolean> = {};
    participants.forEach((p) => {
      initialMap[p.orderId] =
        p.status === "CONFIRMED" || p.status === "REFUNDED"; // 현재 상태 기준
    });
    setCheckedMap(initialMap);
  }, [participants]);

  const handleToggle = (orderId: number) => {
    const newChecked = !checkedMap[orderId];

    if (!newChecked) {
      // 로컬 confirm 모달 열기
      setShowConfirm(orderId);
    } else {
      setCheckedMap((prev) => ({
        ...prev,
        [orderId]: newChecked,
      }));
    }
  };

  const handleConfirmChange = () => {
    if (showConfirm === null) return;
    setCheckedMap((prev) => ({
      ...prev,
      [showConfirm]: false,
    }));
    setShowConfirm(null);
  };

  const handleSubmit = () => {
    if (!participants) return;

    const payload: patchOrderStatusBody[] = participants
      .filter((p) => {
        const isCanceled = p.status === "CANCELED" || p.status === "REFUNDED";
        const currentChecked = !!checkedMap[p.orderId];

        const originallyChecked = isCanceled
          ? p.status === "REFUNDED"
          : p.status === "CONFIRMED";

        return currentChecked !== originallyChecked; // 체크 상태 변경된 경우만
      })
      .map((p) => {
        const isCanceled = p.status === "CANCELED" || p.status === "REFUNDED";

        return {
          orderId: p.orderId,
          status: isCanceled
            ? checkedMap[p.orderId]
              ? "REFUNDED"
              : "CANCELED"
            : checkedMap[p.orderId]
              ? "CONFIRMED"
              : "PENDING",
        };
      });

    if (payload.length === 0) {
      alert("변경된 사항이 없습니다.");
      return;
    }

    patchOrderStatus(payload);
  };

  const handleCopy = (bank: string, account: string) => {
    const msg = `${bank} ${account}`;
    navigator.clipboard.writeText(msg);
    showToast(`${msg} (복사됨)`);
  };

  return (
    <Modal onClose={closeModal}>
      {showConfirm !== null && (
        <ConfirmModal
          confirmTitle="정말 상태를 변경하시겠습니까?"
          subDescription={
            <>
              입금 상태를 <span>'입금 대기'</span>로 되돌리시겠습니까?
              <br />
              이미 <span>입금완료</span>로 표시된 상태입니다.
            </>
          }
          confirmDescription="참여자 확인에 혼란이 생길 수 있으니 신중하게 확인 후 진행해주세요."
          confirmText="변경하기"
          onConfirm={handleConfirmChange}
          onCancel={() => setShowConfirm(null)}
        />
      )}
      <S.Container>
        <S.StyledXIcon onClick={closeModal} />
        <S.Label>참여자 확인하기</S.Label>
        <SectionLine />
        <S.Ment>
          <DotText
            text={
              <S.StyledText>
                참여자가 입금을 완료한 경우, 오른쪽의 토글을 눌러 입금 상태를
                '완료'로 변경해야 참여자의 입금 여부가 확인됩니다.
              </S.StyledText>
            }
          />
          <DotText
            text={
              <S.StyledText>
                입금자명과 입금 내역을 비교하여 토글 상태를 정확히 설정해
                주세요.
              </S.StyledText>
            }
          />
          <DotText
            text={
              <S.StyledText>
                참여 인원이나 주문 수량에 이상이 있을 경우, 즉시 운영자에게
                문의해 주세요.
              </S.StyledText>
            }
          />
          <DotText
            text={
              <S.StyledText>
                개인정보 유출 시 모든 책임은 본인에게 있음에 유의해 주세요.
              </S.StyledText>
            }
          />
        </S.Ment>
        <S.ListLabel>참여자 리스트</S.ListLabel>
        <S.TableWrapper>
          <S.Table>
            <colgroup>
              <col style={{ width: "14%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <S.Tr>
                <S.Th>닉네임</S.Th>
                <S.Th>입금자명</S.Th>
                <S.Th>주문 수량</S.Th>
                <S.Th>가격(원)</S.Th>
                <S.Th>계좌정보</S.Th>
                <S.Th>입금/환불 여부</S.Th>
              </S.Tr>
            </thead>
          </S.Table>
          <S.ScrollBody>
            <S.Table>
              <colgroup>
                <col style={{ width: "14%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <tbody>
                {participants && participants.length > 0 ? (
                  participants.map((p) => (
                    <S.Tr key={p.orderId}>
                      <S.Td
                        $isCanceled={
                          p.status === "CANCELED" || p.status === "REFUNDED"
                        }
                      >
                        {p.nickname}
                      </S.Td>
                      <S.Td>{p.name}</S.Td>
                      <S.Td>{p.quantity}</S.Td>
                      <S.Td>{p.price.toLocaleString()}</S.Td>
                      <S.Td>
                        <S.AccountButton
                          onClick={() =>
                            handleCopy(p.accountName, p.accountNumber)
                          }
                        >
                          계좌 복사
                        </S.AccountButton>
                      </S.Td>
                      <S.Td>
                        <AgreeCheckBox
                          boxStyle="box"
                          checked={!!checkedMap[p.orderId]}
                          onChange={() => handleToggle(p.orderId)}
                        />
                      </S.Td>
                    </S.Tr>
                  ))
                ) : (
                  <S.Tr>
                    <S.Td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "10px 0",
                        color: Colors.Grayscale60,
                      }}
                    >
                      참여자가 없습니다.
                    </S.Td>
                  </S.Tr>
                )}
              </tbody>
            </S.Table>
          </S.ScrollBody>
        </S.TableWrapper>
        <Button $buttonStyle="round" onClick={handleSubmit}>
          저장하기
        </Button>
      </S.Container>
    </Modal>
  );
};

export default HostModal;
