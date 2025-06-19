import * as S from "./InfoForm.styled";
import InputField from "../../common/input/inputField/InputField";
import CheckAccount from "../checkAccount/CheckAccount";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InfoFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  nickname: string;
  isNicknameValid: boolean;
  isNicknameChecked: boolean;
  isNicknameDuplicated: boolean;
  checkingNickname: boolean;
  onCheckNickname: () => void;
  setIsAccountVerified: (v: boolean) => void;
}

const InfoForm = <T extends FieldValues>({
  register,
  errors,
  nickname,
  isNicknameValid,
  isNicknameChecked,
  isNicknameDuplicated,
  checkingNickname,
  onCheckNickname,
  setIsAccountVerified,
}: InfoFormProps<T>) => {
  return (
    <>
      <InputField
        label="닉네임"
        placeholder="사용할 닉네임 입력"
        {...register("nickname" as Path<T>)}
        helperText={
          (errors.nickname?.message as string) ||
          (isNicknameDuplicated
            ? "이미 사용 중인 닉네임입니다. 다시 입력해주세요."
            : !isNicknameChecked && nickname.length >= 2
              ? "닉네임 중복 확인을 해주세요"
              : checkingNickname
                ? "닉네임 중복 확인 중입니다..."
                : "")
        }
        suffix={
          !checkingNickname &&
          !isNicknameChecked && ( // ✅ 중복 확인 완료되면 버튼 숨김
            <S.ConfirmButton
              type="button"
              onClick={onCheckNickname}
              disabled={!isNicknameValid}
            >
              중복 확인
            </S.ConfirmButton>
          )
        }
      />
      <InputField
        label="전화번호"
        placeholder="사용할 전화번호 입력"
        {...register("phoneNumber" as Path<T>)}
        helperText={errors?.phoneNumber?.message as string}
      />
      <CheckAccount onSuccess={() => setIsAccountVerified(true)} />
    </>
  );
};

export default InfoForm;
