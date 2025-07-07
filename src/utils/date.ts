// utils/date.ts에 추가하거나 임시로 함수 교체
export const formatDateTimeForDTO = (date: Date): string => {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
};

/**
 * YYYY.MM.DD HH:mm 형식으로 날짜+시간 포맷
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours < 12 ? "오전" : "오후";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${yyyy}.${mm}.${dd} ${ampm} ${String(displayHour).padStart(2, "0")}:${minutes}`;
}

/**
 * 몇 시간 전, 몇 분 전처럼 상대 시간 표시 (+9시간 보정 포함)
 */
export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const target = new Date(dateString);

  // ✅ 9시간(32400초 = 9 * 60 * 60 * 1000) 보정
  const correctedTarget = new Date(target.getTime() + 9 * 60 * 60 * 1000);

  const diff = (now.getTime() - correctedTarget.getTime()) / 1000; // 초 단위 차이

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;

  return correctedTarget.toLocaleDateString("ko-KR");
}

/**
 * D-day 계산
 * - 1일 이내면 "마감 n시간 n분 n초 전" (0인 단위는 생략)
 * - 1일 이상이면 "마감까지 D-n"
 */
export function getDday(targetDateString: string): string {
  const now = new Date();
  const target = new Date(targetDateString);

  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) return "마감 종료";

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // 1일 이내면 시/분/초 단위로
  if (diffDays < 1) {
    const hours = diffHours % 24;
    const minutes = diffMinutes % 60;
    const seconds = diffSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);
    if (seconds > 0) parts.push(`${seconds}초`);

    return `마감 ${parts.join(" ")} 전`;
  }

  return `마감까지 D-${diffDays}`;
}
