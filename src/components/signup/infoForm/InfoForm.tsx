import * as S from "./InfoForm.styled";
import InputField from "../../common/input/inputField/InputField";
import { useFormContext } from "react-hook-form";
import { SignupInfoFormData } from "../../../schemas/signupInfoSchema";
import { useLocation } from "react-router-dom";

interface InfoFormProps {
  nickname: string;
  isNicknameValid: boolean;
  isNicknameChecked: boolean;
  isNicknameDuplicated: boolean;
  checkingNickname: boolean;
  onCheckNickname: () => void;
  onPhoneSave?: () => void;
  isPhoneChanged?: boolean;
}

const InfoForm = ({
  nickname,
  isNicknameValid,
  isNicknameChecked,
  isNicknameDuplicated,
  checkingNickname,
  onCheckNickname,
  onPhoneSave,
  isPhoneChanged,
}: InfoFormProps) => {
  const { pathname } = useLocation();
  const isEdit = pathname === "/editProfile";

  const {
    register,
    formState: { errors },
  } = useFormContext<SignupInfoFormData>();
  return (
    <>
      <InputField
        label="닉네임"
        placeholder="사용할 닉네임 입력"
        {...register("nickname")}
        helperText={
          errors.nickname?.message ||
          (isNicknameDuplicated
            ? "이미 사용 중인 닉네임입니다. 다시 입력해주세요."
            : !isNicknameChecked && nickname.length >= 2
              ? isEdit
                ? "수정하려면 저장하기 버튼을 눌러주세요"
                : "닉네임 중복 확인을 해주세요"
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
              {isEdit ? "저장하기" : "중복 확인"}
            </S.ConfirmButton>
          )
        }
      />
      <InputField
        label="전화번호"
        placeholder="사용할 전화번호 입력"
        {...register("phoneNumber")}
        helperText={errors?.phoneNumber?.message}
        suffix={
          isEdit &&
          isPhoneChanged &&
          !errors?.phoneNumber && (
            <S.ConfirmButton type="button" onClick={onPhoneSave}>
              저장하기
            </S.ConfirmButton>
          )
        }
      />
    </>
  );
};

export default InfoForm;
