import { useMutation } from "@tanstack/react-query";
import { patchProfileImg } from "../../../api/user";
import { useToastStore } from "../../../stores/useToastStore";

export const usePatchProfileImgMutation = () => {
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: (image: string) => patchProfileImg(image),
    onSuccess: () => {
      showToast("프로필 이미지가 변경되었습니다.");
    },
    onError: (err) => {
      console.error("이미지 변경 실패:", err);
    },
  });
};
