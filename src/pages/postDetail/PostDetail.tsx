import * as S from "./PostDetail.styled";
import CurrentParti from "../../components/common/currentParti/CurrentParti";
import { SectionLine } from "../../components/common/SectionLine.styled";
import Profile from "../../components/common/profile/Profile";
import ImageSlider from "../../components/common/image/imageSlider/ImageSlider";
import { useModalStore } from "../../stores/useModalStore";
import { useParams } from "react-router-dom";
import { formatDateTime, formatRelativeTime, getDday } from "../../utils/date";
import { useOrderStore } from "../../stores/useOrderStore";
import { useProductDetail } from "../../hooks/queries/useProductQuery";
import { useUserStore } from "../../stores/useUserStore";
import { useCancelOrderMutation } from "../../hooks/mutations/order/useCancelOrderMutation";

const PostDetail = () => {
  const openModal = useModalStore((s) => s.openModal);
  const setOrderInfo = useOrderStore((s) => s.setOrderInfo);
  const { postId } = useParams();
  const user = useUserStore((s) => s.user);
  const { data: post, isLoading, isError } = useProductDetail(Number(postId));
  const { mutate: cancelOrder } = useCancelOrderMutation();
  console.log(post);

  const handleOrderClick = () => {
    if (!post) return;

    if (!user) {
      openModal("login");
      return;
    }

    setOrderInfo({
      postId: post.postId,
      productName: post.name,
      unitPrice: post.unitPrice,
      unitAmount: post.unitAmount,
      totalAmount: post.totalAmount,
      leftAmount: post.leftAmount,
      hostAccountBank: post.userProfileResponse.accountBank ?? "정보없음",
      hostAccountNumber: post.userProfileResponse.accountNumber ?? "정보없음",
    });

    openModal("order");
  };

  const handleCancelClick = () => {
    openModal("confirm", {
      confirmTitle: "참여를 취소하시겠습니까?",
      confirmDescription: "취소 3회 이상 시 일정 기간 주문이 제한됩니다.",
      confirmText: "참여취소",
      cancelText: "돌아가기",
      onConfirm: () => {
        if (post) cancelOrder(post.postId);
      },
    });
  };

  const handleButtonClick = () => {
    if (!post) return;

    if (post.isParticipant) {
      handleCancelClick();
    } else {
      handleOrderClick();
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !post) return <div>에러 발생</div>;

  return (
    <S.PostDetailContainer>
      {post && (
        <>
          <S.TopSection>
            <ImageSlider images={post.imageKeys?.map((img) => img.imageKey)} />
            <Profile type="post" user={post.userProfileResponse} />
          </S.TopSection>
          <SectionLine />
          <S.PostInfo>
            <S.TitlePart>
              <S.PostTitle>{post.title}</S.PostTitle>
              <S.ProductTitle>{post.name}</S.ProductTitle>
            </S.TitlePart>
            <S.InfoPart>
              <S.ProductInfo>
                <S.PickupDate>
                  픽업 {formatDateTime(post.pickupDate)} / {post.location}
                </S.PickupDate>
                <S.unitPrice>{post.unitPrice.toLocaleString()}원</S.unitPrice>
                <S.unitAmount>(주문 단위: {post.unitAmount})</S.unitAmount>
              </S.ProductInfo>
              <S.OrderInfo>
                {user?.nickname !== post.userProfileResponse.nickname && (
                  <S.OrderButton
                    onClick={handleButtonClick}
                    disabled={post.postStatus === "CLOSED"}
                    $isCancel={post.isParticipant}
                  >
                    {post.postStatus === "CLOSED"
                      ? "모집마감"
                      : post.isParticipant
                        ? "참여취소"
                        : "주문참여"}
                  </S.OrderButton>
                )}
                <CurrentParti
                  soldAmount={post.soldAmount}
                  totalAmount={post.totalAmount}
                  participantCount={post.participantCount}
                />
                <S.Ddate>마감까지 {getDday(post.dueDate)}</S.Ddate>
              </S.OrderInfo>
            </S.InfoPart>
            <S.DetailPart>
              <S.SectionDivider>
                <S.SectionName>상품 설명</S.SectionName>
                <SectionLine />
              </S.SectionDivider>
              <S.DetailInfo>{post.description}</S.DetailInfo>
              <S.PostDate>{formatRelativeTime(post.createdAt)}</S.PostDate>
            </S.DetailPart>
          </S.PostInfo>
        </>
      )}
    </S.PostDetailContainer>
  );
};

export default PostDetail;
