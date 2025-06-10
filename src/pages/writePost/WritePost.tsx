import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { PostFormData, writePostSchema } from "../../schemas/writePostSchema";
import { useUserStore } from "../../stores/useUserStore";
import { useModalStore } from "../../stores/useModalStore";
import { useGetAIMutation } from "../../hooks/mutations/host/useGetAIMutation";
import { usePostMutation } from "../../hooks/mutations/host/usePostMutation";
import { uploadImages } from "../../api/image";
import Loading from "../../components/common/loading/Loding";
import * as S from "./WritePost.styled";
import InputField from "../../components/common/input/inputField/InputField";
import Button from "../../components/common/button/Button";
import Send from "../../assets/icons/LightSend.svg";
import { HelperText } from "../../components/common/HelperText.styled";
import { formatDateTimeForDTO } from "../../utils/date";
import PostForm from "../../components/writePost/postForm/PostForm";

const WritePost = () => {
  const user = useUserStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isAISubmitted, setIsAISubmitted] = useState(false);

  const methods = useForm<PostFormData>({
    resolver: zodResolver(writePostSchema),
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const url = watch("url");

  const { mutate: getAIMutate, isPending: isGeneratingAI } = useGetAIMutation(
    setValue,
    setIsAISubmitted
  );

  const { mutate: writePostMutate, isPending: isPosting } = usePostMutation();

  useEffect(() => {
    setIsAISubmitted(false);
  }, [url]);

  if (isGeneratingAI) {
    setValue("price", -1);
  }

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      const imageKeys = await uploadImages(imageFiles);
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

  if (isPosting) return <Loading message="공구글 게시중입니다" />;

  return (
    <S.Container>
      <FormProvider {...methods}>
        <S.URL>
          <InputField
            label="URL (선택)"
            styleType="post"
            placeholder="상품 URL을 입력해주세요"
            {...methods.register("url")}
          />
          <Button
            disabled={!url || isGeneratingAI || isAISubmitted || !!errors.url}
            onClick={() => {
              if (!url || errors?.url || isGeneratingAI || isAISubmitted)
                return;
              getAIMutate(url);
            }}
            buttonStyle="square"
          >
            <img src={Send} />
          </Button>
        </S.URL>
        <HelperText>
          {isGeneratingAI
            ? "AI 답변 생성은 최대 1분 소요될 수 있습니다. 다른 폼들을 채워주시면 얼른 가져다드리겠습니다 💌 (❁´◡`❁)"
            : errors.url?.message}
        </HelperText>

        <PostForm
          onSubmit={onSubmit}
          setImageFiles={setImageFiles}
          disabledFields={
            isGeneratingAI
              ? [
                  "title",
                  "name",
                  "price",
                  "totalAmount",
                  "unitAmount",
                  "hostQuantity",
                  "description",
                  "submitButton",
                ]
              : []
          }
          submitButtonText="작성 완료"
          mode="write"
        />
      </FormProvider>
    </S.Container>
  );
};

export default WritePost;
