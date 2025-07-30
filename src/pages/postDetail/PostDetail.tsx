import * as S from "./PostDetail.styled";
import CurrentParti from "../../components/common/currentParti/CurrentParti";
import { SectionLine } from "../../components/common/SectionLine.styled";
import Profile from "../../components/common/profile/Profile";
import ImageSlider from "../../components/common/image/imageSlider/ImageSlider";
import { useModalStore } from "../../stores/useModalStore";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTime, formatRelativeTime, getDday } from "../../utils/date";
import { useOrderStore } from "../../stores/useOrderStore";
import { useUserStore } from "../../stores/useUserStore";
import { useCancelOrderMutation } from "../../hooks/mutations/order/useCancelOrderMutation";
import Loading from "../../components/common/loading/Loding";
import { useProductDetail } from "../../hooks/queries/useProductQuery";
import { useEffect, useState } from "react";

const PostDetail = () => {
  const openModal = useModalStore((s) => s.openModal);
  const setOrderInfo = useOrderStore((s) => s.setOrderInfo);
  const navigate = useNavigate();
  const { postId } = useParams();
  const user = useUserStore((s) => s.user);
  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useProductDetail(Number(postId));
  const { mutate: cancelOrder } = useCancelOrderMutation(Number(postId));
  console.log(post);

  const [ddayText, setDdayText] = useState<string>("");

  useEffect(() => {
    if (!post?.dueDate) return;

    const updateDday = () => {
      setDdayText(getDday(post.dueDate));

      // 마감 도달 시 refetch 한 번 실행
      if (ddayText === "마감 종료") {
        refetch(); // ✅ 마감 도달 시 최신 post 상태 갱신
      }
    };

    updateDday(); // 초기값 바로 설정

    if (ddayText === "마감 종료") return;

    const timer = setInterval(updateDday, 1000); // 1초마다 갱신

    return () => clearInterval(timer); // 언마운트 시 클리어
  }, [post?.dueDate, ddayText, refetch]);

  const handleOrderClick = () => {
    if (!post) return;

    if (!user) {
      alert("로그인이 필요한 기능입니다");
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
      hostAccountBank: post.userProfileResponse.accountBank,
      hostAccountNumber: post.userProfileResponse.accountNumber,
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
        if (post) cancelOrder();
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

  if (isLoading) return <Loading message="게시글을 불러오는 중입니다" />;
  if (isError || !post) return <div>에러 발생</div>;

  return (
    <S.PostDetailContainer>
      {post && (
        <>
          <S.TopSection>
            <ImageSlider
              postId={post.postId}
              images={post.imageKeys?.map((img) => img.imageKey)}
            />
            <Profile
              type="post"
              postId={post.postId}
              user={post.userProfileResponse}
              isParticipant={post.isParticipant}
              isHidden={post.postStatus !== "OPEN"}
            />
          </S.TopSection>
          <SectionLine />
          <S.PostInfo>
            <S.TitlePart>
              <S.PostTitle>{post.title}</S.PostTitle>
              {post.url ? (
                <S.Url
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📎
                  <S.UrlTitle>{post.name}</S.UrlTitle>
                </S.Url>
              ) : (
                <S.ProductTitle>{post.name}</S.ProductTitle>
              )}
            </S.TitlePart>
            <S.InfoPart>
              <S.ProductInfo>
                <S.PickupDate>
                  픽업 {formatDateTime(post.pickupDate)} / {post.location}
                </S.PickupDate>
                <S.unitPrice>
                  개당 {post.unitPrice.toLocaleString()}원
                </S.unitPrice>
                <S.unitAmount>(주문 단위: {post.unitAmount})</S.unitAmount>
              </S.ProductInfo>
              <S.OrderInfo>
                {user?.nickname !== post.userProfileResponse.nickname && (
                  <S.OrderButton
                    onClick={handleButtonClick}
                    disabled={post.postStatus !== "OPEN"}
                    $isCancel={post.isParticipant}
                  >
                    {post.postStatus === "ENDED"
                      ? "공구종료"
                      : post.postStatus === "CLOSED"
                        ? "모집마감"
                        : post.isParticipant
                          ? "참여취소"
                          : "주문참여"}
                  </S.OrderButton>
                )}
                {post.postStatus !== "ENDED" && (
                  <>
                    <CurrentParti
                      soldAmount={post.soldAmount}
                      totalAmount={post.totalAmount}
                      participantCount={post.participantCount}
                    />
                    <S.Ddate>
                      {post.postStatus === "OPEN"
                        ? `⏰ ${ddayText}`
                        : post.leftAmount === 0
                          ? "🛒 품절! 매진되었어요"
                          : "⏰ 마감기간이 지났어요"}
                    </S.Ddate>
                  </>
                )}
              </S.OrderInfo>
            </S.InfoPart>
            {post.isParticipant && (
              <S.GoChat onClick={() => navigate(`/chat/${post.chatRoomId}`)}>
                채팅방 참여해보기
              </S.GoChat>
            )}
            <S.DetailPart>
              <S.SectionDivider>
                <S.SectionName>상품 설명</S.SectionName>
                <SectionLine />
              </S.SectionDivider>
              <S.DetailInfo>{post.description.trimEnd()}</S.DetailInfo>
              <S.PostDate>{formatRelativeTime(post.createdAt)}</S.PostDate>
            </S.DetailPart>
          </S.PostInfo>
        </>
      )}
    </S.PostDetailContainer>
  );
};

export default PostDetail;
