import NonLike from "../../../assets/icons/NonLike.svg";
import Like from "../../../assets/icons/Like.svg";
import {
  useDeleteLikeMutation,
  usePostLikeMutation,
} from "../../../hooks/mutations/user/useLikeMutation";
import { useLikeStore } from "../../../stores/useLikeStore";
import * as S from "./LikeToggle.styled";
import { useUserStore } from "../../../stores/useUserStore";
import { useModalStore } from "../../../stores/useModalStore";
import { GetMyListParams } from "../../../types/userType";

interface LikeToggleProps {
  postId: number;
  imageType?: "normal" | "full";
  params?: GetMyListParams;
}

const LikeToggle = ({
  postId,
  imageType = "normal",
  params,
}: LikeToggleProps) => {
  const { mutate: postLikeMutate } = usePostLikeMutation(postId);
  const { mutate: deleteLikeMutate } = useDeleteLikeMutation(postId, params);
  const toggleLike = useLikeStore((s) => s.toggleLike);
  const isLiked = useLikeStore((s) => s.isLiked(postId));
  const user = useUserStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert("로그인이 필요한 기능입니다");
      openModal("login");
      return;
    }
    if (isLiked) {
      deleteLikeMutate(undefined, { onSuccess: () => toggleLike(postId) });
    } else {
      postLikeMutate(undefined, { onSuccess: () => toggleLike(postId) });
    }
  };

  return (
    <S.LikeToggleButton
      $imageType={imageType}
      onClick={handleClick}
      src={isLiked ? Like : NonLike}
    />
  );
};

export default LikeToggle;
