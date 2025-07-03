import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { PostFormData, writePostSchema } from "../../schemas/writePostSchema";
import { useUserStore } from "../../stores/useUserStore";
import { useModalStore } from "../../stores/useModalStore";
import { usePostMutation } from "../../hooks/mutations/host/usePostMutation";
import Loading from "../../components/common/loading/Loding";
import * as S from "./WritePost.styled";
import { formatDateTimeForDTO } from "../../utils/date";
import PostForm from "../../components/writePost/postForm/PostForm";
import { useUploadImageMutation } from "../../hooks/mutations/image/useUploadImageMutation";
import { EditPostFormData } from "../../schemas/editPostSchema";

const WritePost = () => {
  const user = useUserStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { mutateAsync: uploadImage, isPending } = useUploadImageMutation();

  const methods = useForm<PostFormData>({
    resolver: zodResolver(writePostSchema),
    mode: "onChange",
  });

  const { mutate: writePostMutate, isPending: isPosting } = usePostMutation();

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      const urls = data.imageUrls ?? [];

      // 1. 로컬 이미지 업로드
      const localUploadResults =
        imageFiles.length > 0 ? await uploadImage(imageFiles) : [];

      // 2. imageUrls 순서 유지하면서 key 매핑
      let localIndex = 0;
      const imageKeys = urls.map((url) => {
        if (url.includes("/tmp/")) {
          // AI 이미지 → tmp 키 추출
          const parts = url.split("/");
          const tmpIndex = parts.findIndex((p) => p === "tmp");
          return tmpIndex >= 0 ? `tmp/${parts[tmpIndex + 1]}` : "";
        } else {
          // 로컬 이미지 → 업로드 결과에서 순서대로 가져오기
          return localUploadResults[localIndex++] ?? "";
        }
      });

      const { imageUrls, ...rest } = data;
      void imageUrls;

      const payload = {
        ...rest,
        imageKeys,
        location: "카카오테크 부트캠프장",
        dueDate: formatDateTimeForDTO(data.dueDate),
        pickupDate: formatDateTimeForDTO(data.pickupDate),
      };

      if (payload.url === "") {
        delete payload.url;
      }

      writePostMutate(payload);
    } catch (err) {
      console.error("전체 게시 실패", err);
    }
  };

  const onSubmit = (data: PostFormData) => {
    if (!user) {
      alert("다시 로그인해주세요.");
      openModal("login");
      return;
    }
    handleFormSubmit(data);
  };

  if (isPending) return <Loading message="이미지 업로드중입니다" />;
  if (isPosting) return <Loading message="공구글 게시중입니다" />;

  return (
    <S.Container>
      <FormProvider {...methods}>
        <PostForm
          onSubmit={onSubmit as (data: PostFormData | EditPostFormData) => void}
          setImageFiles={setImageFiles}
          submitButtonText="작성 완료"
          mode="write"
        />
      </FormProvider>
    </S.Container>
  );
};

export default WritePost;
