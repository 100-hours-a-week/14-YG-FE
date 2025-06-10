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
  onSubmit: (data: PostFormData) => void;
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
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<EditPostFormData>();
  const user = useUserStore((s) => s.user);
  const isDisabled = (field: FieldKey) => disabledFields?.includes(field);

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
        value={watch("imageUrls")}
        onChange={(urls, files) => {
          setValue("imageUrls", urls);
          setImageFiles(files);
        }}
        helperText={errors.imageUrls?.message}
      />
      <InputField
        label="공구 제목"
        styleType="post"
        placeholder="공구 제목을 입력해주세요"
        disabled={isDisabled("title")}
        {...register("title")}
        value={watch("title")}
        helperText={!isDisabled && errors.title?.message}
      />
      <InputField
        label="상품 이름"
        styleType="post"
        placeholder="상품 이름을 입력해주세요"
        disabled={isDisabled("name")}
        {...register("name")}
        value={watch("name")}
        helperText={!isDisabled && errors.name?.message}
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
        disabled={isDisabled("price")}
        helperText={!isDisabled ? errors.price : undefined}
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
        disabled={isDisabled("description")}
        helperText={!isDisabled ? errors.description?.message : undefined}
        value={watch("description")}
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
          placeholder="픽업일자 변경 사유를 작성해주세요."
          {...register("dateModificationReason")}
          helperText={errors.dateModificationReason?.message}
        />
      )}

      {errors.pickupDate?.message && (
        <HelperText>{errors.pickupDate.message}</HelperText>
      )}

      <S.ButtonWrapper>
        <Button type="submit" disabled={isDisabled("submitButton")}>
          {submitButtonText}
        </Button>
      </S.ButtonWrapper>
    </S.PostForm>
  );
};

export default PostForm;
