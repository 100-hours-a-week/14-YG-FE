import { Controller, useFormContext } from "react-hook-form";
import MultiImageUploader from "../../../components/writePost/multiImageUploader/MultiImageUploader";
import InputField from "../../../components/common/input/inputField/InputField";
import TextAreaField from "../../../components/common/input/textAreaField/TextAreaField";
import ControlledNumberInput from "../../../components/common/input/controlledNumberInput/ControlledNumberInput";
import UnitAmountSelector from "../../../components/writePost/unitAmountSelector/UnitAmountSelector";
import DateInput from "../../../components/common/input/dateInput/DateInput";
import { HelperText } from "../../../components/common/HelperText.styled";
import Button from "../../../components/common/button/Button";
import * as S from "./PostForm.styled";
import { PostFormData } from "../../../schemas/writePostSchema";
import { useUserStore } from "../../../stores/useUserStore";
import { EditPostFormData } from "../../../schemas/editPostSchema";
import { useEffect, useState } from "react";
import { useGetAIMutation } from "../../../hooks/mutations/host/useGetAIMutation";
import Send from "../../../assets/icons/LightSend.svg";

type FieldKey =
  | "title"
  | "name"
  | "price"
  | "unitAmount"
  | "totalAmount"
  | "hostQuantity"
  | "description"
  | "submitButton";

type PostFormProps = {
  onSubmit: (data: PostFormData | EditPostFormData) => void;
  setImageFiles: (files: File[]) => void;
  disabledFields?: FieldKey[];
  submitButtonText?: string;
  hostMaxQuantity?: number;
  mode: "write" | "edit";
  originalPickupDate?: Date | null;
};

const PostForm = ({
  onSubmit,
  setImageFiles,
  disabledFields = [],
  submitButtonText = "작성 완료",
  hostMaxQuantity,
  originalPickupDate,
  mode,
}: PostFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useFormContext<EditPostFormData>();
  const [isAISubmitted, setIsAISubmitted] = useState(false);
  const user = useUserStore((s) => s.user);
  const isDisabled = (field: FieldKey) => disabledFields?.includes(field);
  const imageUrls = watch("imageUrls") ?? [];
  const {
    mutate: getAIMutate,
    isSuccess,
    isPending: isGeneratingAI,
  } = useGetAIMutation(setValue, setIsAISubmitted);

  if (isGeneratingAI) {
    disabledFields = ["totalAmount", "unitAmount"];
  }

  useEffect(() => {
    if (isSuccess) {
      alert(
        "공고글을 자동으로 채워봤어요!\n정확하지 않을 수 있으니 꼭 한번 확인하고 수정해 주세요 😊"
      );
    }
  }, [isSuccess]);

  const url = watch("url");

  useEffect(() => {
    setIsAISubmitted(false);
  }, [url]);

  if (isGeneratingAI) {
    setValue("price", -1);
  }

  const pickupDate = watch("pickupDate");

  const isPickupDateChanged =
    mode === "edit" &&
    originalPickupDate &&
    pickupDate &&
    pickupDate.toISOString().slice(0, 10) !==
      originalPickupDate.toISOString().slice(0, 10);
  return (
    <S.PostForm onSubmit={handleSubmit(onSubmit)}>
      <MultiImageUploader
        key={imageUrls.join(",")} // ✅ 강제 리렌더링을 유도
        defaultPreviewUrls={imageUrls} // ✅ 항상 최신 값 전달
        onChange={(urls, files) => {
          setValue("imageUrls", urls);
          setImageFiles(files);
        }}
        helperText={errors.imageUrls?.message}
      />
      <S.URL>
        <InputField
          label="URL (선택)"
          styleType="post"
          placeholder="상품 URL을 입력해주세요"
          {...register("url")}
        />
        <Button
          disabled={!url || isGeneratingAI || isAISubmitted || !!errors.url}
          onClick={() => {
            if (!url || errors?.url || isGeneratingAI || isAISubmitted) return;
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
      <InputField
        label="공구 제목"
        styleType="post"
        placeholder="공구 제목을 입력해주세요"
        disabled={isGeneratingAI}
        {...register("title")}
        value={isGeneratingAI ? "AI 답변 생성중..." : (watch("title") ?? "")}
        helperText={!isGeneratingAI && errors.title?.message}
      />
      <InputField
        label="상품 이름"
        styleType="post"
        placeholder="상품 이름을 입력해주세요"
        disabled={isGeneratingAI}
        {...register("name")}
        value={isGeneratingAI ? "AI 답변 생성중..." : (watch("name") ?? "")}
        helperText={!isGeneratingAI && errors.name?.message}
      />

      <S.Label>계좌번호</S.Label>
      <S.AccountPart>
        <Button disabled>{user?.accountBank}</Button>
        <InputField value={user?.accountNumber} required={false} disabled />
      </S.AccountPart>

      <ControlledNumberInput
        name="price"
        control={control}
        label="상품 전체 가격"
        placeholder="가격을 입력해주세요"
        prefix="₩"
        maxDigits={9}
        disabled={isDisabled("price") || isGeneratingAI}
        helperText={!isDisabled && !isGeneratingAI ? errors.price : undefined}
      />

      <UnitAmountSelector
        mode={submitButtonText === "작성 완료" ? "write" : "edit"}
        disabledFields={(
          ["totalAmount", "unitAmount", "hostQuantity"] as const
        ).filter((key) => isDisabled(key))}
        hostMaxQuantity={hostMaxQuantity}
      />

      <TextAreaField
        label="자세한 설명"
        placeholder="공구방에 올릴 게시글 내용을 작성해주세요."
        {...register("description")}
        disabled={isGeneratingAI}
        helperText={!isGeneratingAI ? errors.description?.message : undefined}
        value={
          isGeneratingAI ? "AI 답변 생성중..." : (watch("description") ?? "")
        }
      />

      <Controller
        control={control}
        name="dueDate"
        render={({ field, fieldState }) => (
          <DateInput
            label="공구 마감 일자"
            value={field.value}
            placeholder="마감 일자를 선택해주세요"
            onChange={field.onChange}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <S.Pickup>
        <Controller
          control={control}
          name="pickupDate"
          render={({ field }) => (
            <DateInput
              label="픽업 일자 / 거래 장소"
              value={field.value}
              placeholder="픽업 일자를 선택해주세요"
              onChange={field.onChange}
            />
          )}
        />
        <InputField styleType="post" placeholder="카테부 교육장" disabled />
      </S.Pickup>
      {isPickupDateChanged && (
        <InputField
          label="픽업일자 변경 사유"
          styleType="post"
          placeholder="픽업일 변경 사유를 작성해주세요."
          {...register("dateModificationReason")}
          helperText={errors.dateModificationReason?.message}
        />
      )}

      {errors.pickupDate?.message && (
        <HelperText>{errors.pickupDate.message}</HelperText>
      )}

      <S.ButtonWrapper>
        <Button
          type="submit"
          disabled={
            imageUrls.length === 0 || !isValid || isDisabled("submitButton")
          }
        >
          {submitButtonText}
        </Button>
      </S.ButtonWrapper>
    </S.PostForm>
  );
};

export default PostForm;
