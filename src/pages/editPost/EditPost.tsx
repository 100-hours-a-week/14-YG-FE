import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../../stores/useUserStore";
import { useModalStore } from "../../stores/useModalStore";
import { useEditPostMutation } from "../../hooks/mutations/host/useEditPostMutation";
import { formatDateTimeForDTO } from "../../utils/date";
import Loading from "../../components/common/loading/Loding";
import PostForm from "../../components/writePost/postForm/PostForm";
import * as S from "./EditPost.styled";
import { useEditPostQuery } from "../../hooks/queries/useEditPostQuery";
import { EditPostFormData, editPostSchema } from "../../schemas/editPostSchema";
import { EditPostRequest } from "../../types/productType";
import { useUploadImageMutation } from "../../hooks/mutations/image/useUploadImageMutation";
import { getImageUrl } from "../../utils/image";
import { PostFormData } from "../../schemas/writePostSchema";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { data: postData, isLoading } = useEditPostQuery(Number(postId));
  const { mutateAsync: uploadImage, isPending } = useUploadImageMutation();
  const editMutation = useEditPostMutation(Number(postId));
  console.log(postData);

  const methods = useForm<EditPostFormData>({
    resolver: zodResolver(editPostSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      name: "",
      url: "",
      imageUrls: [],
      price: 0,
      hostQuantity: 1,
      description: "",
      dueDate: new Date(),
      pickupDate: new Date(),
    },
  });

  const [initialPickupDate, setInitialPickupDate] = useState<Date | null>(null);

  useEffect(() => {
    if (postData && postData.imageKeys.length > 0) {
      const pickup = new Date(postData.pickupDate);
      setInitialPickupDate(pickup);

      const allImageUrls = postData.imageKeys.map((img) =>
        getImageUrl(img.imageKey)
      );

      methods.reset({
        ...postData,
        dueDate: new Date(postData.dueDate),
        pickupDate: pickup,
        originalPickupDate: pickup,
        imageUrls: allImageUrls,
      });
    }
  }, [postData, methods]); // 핵심: imageKeys.length까지 dependency에 추가

  const handleFormSubmit = async (data: EditPostFormData) => {
    try {
      const imageUrls = methods.getValues("imageUrls");
      const remainingOldImageKeys = (postData?.imageKeys ?? [])
        .filter((img) => imageUrls?.includes(getImageUrl(img.imageKey)))
        .map((img) => img.imageKey);

      const uploadedImageKeys =
        imageFiles.length > 0 ? await uploadImage(imageFiles) : [];

      const finalImageKeys = [...remainingOldImageKeys, ...uploadedImageKeys];
      console.log(finalImageKeys);

      const isPickupDateChanged =
        initialPickupDate &&
        data.pickupDate &&
        data.pickupDate.toISOString().slice(0, 10) !==
          initialPickupDate.toISOString().slice(0, 10);

      const payload: EditPostRequest = {
        postId: Number(postId),
        title: data.title,
        name: data.name,
        description: data.description,
        hostQuantity: data.hostQuantity,
        dueDate: formatDateTimeForDTO(data.dueDate),
        imageKeys: finalImageKeys,
        ...(isPickupDateChanged && {
          pickupDate: formatDateTimeForDTO(data.pickupDate),
          dateModificationReason: data.dateModificationReason,
        }),
      };

      console.log(payload);

      editMutation.mutate(payload, {
        onSuccess: () => {
          navigate(`/products/${Number(postId)}`);
        },
      });
    } catch (err) {
      console.error("수정 실패", err);
    }
  };

  const onSubmit = (data: EditPostFormData) => {
    if (!user) {
      alert("다시 로그인해주세요.");
      openModal("login");
      return;
    }
    handleFormSubmit(data);
  };

  if (isPending) return <Loading message="이미지 업로드중입니다" />;
  if (isLoading) return <Loading message="게시글을 불러오는 중입니다" />;
  if (editMutation.isPending) return <Loading message="수정 중입니다" />;

  return (
    <S.Container>
      <FormProvider {...methods}>
        <PostForm
          onSubmit={onSubmit as (data: PostFormData | EditPostFormData) => void}
          setImageFiles={setImageFiles}
          submitButtonText="수정 완료"
          hostMaxQuantity={postData?.leftAmount}
          disabledFields={["price", "totalAmount", "unitAmount"]}
          mode="edit"
          originalPickupDate={initialPickupDate}
        />
      </FormProvider>
    </S.Container>
  );
};

export default EditPost;
