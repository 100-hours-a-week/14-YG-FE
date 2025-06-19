import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./SignupInfo.styled";
import Button from "../../components/common/button/Button";
import {
  SignupInfoFormData,
  signupInfoSchema,
} from "../../schemas/signupInfoSchema";
import AgreeCheckBox from "../../components/common/agreeCheckbox/AgreeCheckBox";
import { SignupRequestData } from "../../api/user";
import { useNicknameCheckMutation } from "../../hooks/mutations/user/useNicknameCheckMutation";
import { useEffect, useState } from "react";
import { BANK_OPTIONS } from "../../constants";
import { useSignupMutation } from "../../hooks/mutations/user/useSignupMutation";
import { useNavigate } from "react-router-dom";
import InfoForm from "../../components/signup/infoForm/InfoForm";

const Signup = () => {
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
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
    watch("agree") === true &&
    isAccountVerified;

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

    const requestData: SignupRequestData = {
      ...step1,
      nickname: data.nickname,
      name: data.name,
      phoneNumber: data.phoneNumber,
      accountBank:
        BANK_OPTIONS.find((bank) => bank.value === data.accountBank?.value)
          ?.label ?? "",
      accountNumber: data.accountNumber,
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
        <InfoForm
          register={register}
          errors={errors}
          nickname={nickname}
          isNicknameValid={isNicknameValid}
          isNicknameChecked={isNicknameChecked}
          isNicknameDuplicated={isNicknameDuplicated}
          checkingNickname={checkingNickname}
          onCheckNickname={handleClick}
          setIsAccountVerified={setIsAccountVerified}
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
