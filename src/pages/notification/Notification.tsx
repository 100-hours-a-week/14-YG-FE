import { useInView } from "react-intersection-observer";
import { SectionLine } from "../../components/common/SectionLine.styled";
import * as S from "./Notification.styled";
import { useEffect } from "react";
import { useInfinitePrevNotices } from "../../hooks/queries/useInfiniteQuery";
import Loading from "../../components/common/loading/Loding";
import { useNavigate } from "react-router-dom";
import { postNoticeStatus } from "../../api/notification";
import { NotificationType } from "../../types/notificationType";

const notificationEmojiMap: Record<NotificationType, string> = {
  ORDER_PENDING: "🛒",
  ORDER_CONFIRMED: "✅",
  ORDER_CANCELED: "❌",
  ORDER_REFUNDED: "💸",
  GROUPBUY_STATUS_CLOSED: "🎉",
  GROUPBUY_STATUS_FINALIZED: "📦",
  GROUPBUY_STATUS_ENDED: "🏁",
  GROUPBUY_PICKUP_UPDATED: "📅",
};

const Notification = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0 });
  const { notices, fetchNext, hasNext, isLoading, isFetching } =
    useInfinitePrevNotices();
  console.log(notices);

  useEffect(() => {
    const unreadIds = notices.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length > 0) {
      Promise.all(unreadIds.map((id) => postNoticeStatus(id)));
    }
  }, [notices]);

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNext();
    }
  }, [inView, fetchNext, isFetching]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div>
        {notices.map((notice) => (
          <div key={notice.id}>
            <S.unitNotice
              $isRead={notice.read}
              onClick={() => {
                navigate(`/products/${notice.payload.groupBuyId}`);
              }}
            >
              <S.StyledIcon />
              <S.Text>
                {notificationEmojiMap[notice.type]} [{notice.payload.title}]{" "}
                {notice.body.trimEnd()}
              </S.Text>
            </S.unitNotice>
            <SectionLine />
          </div>
        ))}
      </div>
      <div
        ref={hasNext ? ref : undefined}
        style={{ height: hasNext ? 30 : 0 }}
      />
    </>
  );
};

export default Notification;
