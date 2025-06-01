import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./SignupInfo.styled";
import Button from "../../components/common/button/Button";
import {
  SignupInfoFormData,
  signupInfoSchema,
} from "../../schemas/signupInfoSchema";
import InputField from "../../components/common/input/inputField/InputField";
import Dropdown from "../../components/common/input/dropdown/Dropdown";
import ImageUploader from "../../components/common/image/imageUploader/ImageUploader";
import AgreeCheckBox from "../../components/common/agreeCheckbox/AgreeCheckBox";
import { SignupRequestData } from "../../api/user";
import { useNicknameCheckMutation } from "../../hooks/mutations/user/useNicknameCheckMutation";
import { useEffect, useState } from "react";
import { BANK_OPTIONS } from "../../constants";
import { useSignupMutation } from "../../hooks/mutations/user/useSignupMutation";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../../api/image";

const inputFields = [
  {
    name: "name",
    label: "실명",
    placeholder: "이름 입력",
  },
  {
    name: "phoneNumber",
    label: "전화번호",
    placeholder: "사용할 전화번호 입력",
  },
] as const;

const Signup = () => {
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutate: signup, isPending: waitingSignup } = useSignupMutation();
  const { mutate: checkNickname, isPending: checkingNickname } =
    useNicknameCheckMutation({
      onSuccess: (data) => {
        if (data.isDuplication === "NO") {
          setIsNicknameChecked(true);
          setIsNicknameDuplicated(false);
        } else {
          setIsNicknameChecked(false);
          setIsNicknameDuplicated(true);
        }
      },
      onError: () => {
        setIsNicknameChecked(false);
        setIsNicknameDuplicated(false);
      },
    });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signupInfoSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const nickname = watch("nickname") || "";
  const isNicknameValid = !errors.nickname;
  const isFormValid =
    Object.keys(errors).length === 0 &&
    watch("nickname") &&
    isNicknameChecked &&
    watch("name") &&
    watch("phoneNumber") &&
    watch("accountBank") &&
    watch("accountNumber") &&
    watch("agree") === true;

  useEffect(() => {
    console.log("🔥 errors:", errors);
  }, [errors]);

  const handleClick = () => {
    checkNickname(nickname);
  };

  useEffect(() => {
    setIsNicknameChecked(false);
    setIsNicknameDuplicated(false);
  }, [nickname]);

  const onSubmit = async (data: SignupInfoFormData) => {
    const step1Data = localStorage.getItem("signupStep1");
    if (!step1Data) {
      alert("이메일/비밀번호 정보가 없습니다. 처음부터 다시 회원가입해주세요.");
      navigate("/");
      return;
    }

    const step1 = JSON.parse(step1Data);
    let imageUrl = "";

    if (imageFile) {
      try {
        const [uploadedKey] = await uploadImages([imageFile]);
        imageUrl = uploadedKey;
      } catch (err) {
        console.error("이미지 업로드 실패:", err);
        alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      console.log(imageUrl);
    }

    const requestData: SignupRequestData = {
      ...step1,
      nickname: data.nickname,
      name: data.name,
      phoneNumber: data.phoneNumber,
      accountBank: data.accountBank?.value ?? "", // ✅ string으로 변환
      accountNumber: data.accountNumber,
      ...(imageUrl && { imageUrl }),
    };

    signup(requestData);
  };

  return (
    <S.SignupSection>
      <S.SectionName>가입 정보 수집</S.SectionName>
      <S.SectionInfo>
        회원가입을 완료하려면 아래 정보를 입력해주세요.
        <br />
        해당 정보는 <span>주문 및 환불 시 본인 확인</span>을 위해 사용되며
        <br />
        부정확한 경우 환불이 제한될 수 있습니다.
      </S.SectionInfo>
      <S.SignupForm onSubmit={handleSubmit(onSubmit)}>
        <ImageUploader
          styleType="circle"
          onChange={(url, file) => {
            setImageFile(file); // S3 업로드용
          }}
        />
        <InputField
          label="닉네임"
          placeholder="사용할 닉네임 입력"
          {...register("nickname")}
          helperText={
            errors.nickname?.message ||
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
                onClick={handleClick}
                disabled={!isNicknameValid}
              >
                중복 확인
              </S.ConfirmButton>
            )
          }
        />
        {inputFields.map(({ name, label, placeholder }) => (
          <InputField
            key={name}
            label={label}
            placeholder={placeholder}
            {...register(name)}
            helperText={errors?.[name]?.message}
          />
        ))}
        <Controller
          name="accountBank"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="은행 선택"
              options={[{ label: "은행 선택", value: "" }, ...BANK_OPTIONS]}
              {...field}
              value={field.value ?? null}
              placeholder="은행 선택"
              helperText={errors.accountBank?.value?.message}
            />
          )}
        />
        <InputField
          label="계좌번호"
          placeholder="사용할 계좌번호 입력"
          {...register("accountNumber")}
          helperText={errors.accountNumber?.message}
        />
        <AgreeCheckBox
          label="개인정보 수집 동의"
          message="동의"
          {...register("agree")}
          checked={watch("agree") ?? false} // watch로 체크 여부 관리
          helperText={errors.agree?.message}
          info="입력하신 정보는 서비스 운영을 위한 본인 확인, 주문 처리 및 환불 안내
                      목적으로만 사용되며, 어떠한 경우에도 동의 없이 제3자에게 제공되지
                      않습니다. 개인정보의 수집 및 이용에 관한 보다 자세한 내용은
                      **[개인정보처리방침]**에서 확인하실 수 있으며, 해당 방침은 관련
                      법률에 따라 안전하게 관리되고 있습니다."
        />
        <Button type="submit" disabled={!isFormValid || waitingSignup}>
          {waitingSignup ? "뭉치는 중..." : "지금부터 뭉치기"}
        </Button>
      </S.SignupForm>
    </S.SignupSection>
  );
};

export default Signup;
