import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "../../schemas/signupSchema";
import * as S from "./Signup.styled";
import Button from "../../components/common/button/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/input/inputField/InputField";
import { useEmailCheckMutation } from "../../hooks/mutations/user/useEmailCheckMutation";
import { useEffect, useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);

  const { mutate: checkEmail, isPending: checkingEmail } =
    useEmailCheckMutation({
      onSuccess: (data) => {
        if (data.isDuplication === "NO") {
          setIsEmailChecked(true);
          setIsEmailDuplicated(false);
        } else {
          setIsEmailChecked(false);
          setIsEmailDuplicated(true);
        }
      },
      onError: () => {
        setIsEmailChecked(false);
        setIsEmailDuplicated(false);
      },
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const email = watch("email") || "";
  const isEmailValid = !errors.email;
  const isFormValid = isEmailChecked && Object.keys(errors).length === 0;

  const handleClick = () => {
    checkEmail(email);
  };

  useEffect(() => {
    setIsEmailChecked(false);
    setIsEmailDuplicated(false);
  }, [email]);

  const onSubmit = (data: SignupFormData) => {
    const { email, password } = data;

    localStorage.setItem("signupStep1", JSON.stringify({ email, password }));

    navigate("/signupInfo");
  };

  return (
    <S.SignupSection>
      <S.SectionName>가입 정보 입력</S.SectionName>
      <S.SignupForm onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="이메일"
          placeholder="이메일 입력"
          {...register("email")}
          helperText={
            errors.email?.message ||
            (isEmailDuplicated
              ? "이미 사용 중인 이메일입니다. 다시 입력해주세요."
              : email.length > 5 && isEmailValid && !isEmailChecked
                ? "이메일 중복 확인을 해주세요"
                : checkingEmail
                  ? "이메일 중복 확인중입니다..."
                  : "")
          }
          suffix={
            !isEmailChecked && ( // ✅ 중복 확인 완료되면 버튼 숨김
              <S.ConfirmButton
                type="button"
                onClick={handleClick}
                disabled={!isEmailValid}
              >
                중복 확인
              </S.ConfirmButton>
            )
          }
        />
        <InputField
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          {...register("password")}
          helperText={errors.password?.message}
        />
        <InputField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          {...register("confirmPassword")}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" disabled={!isFormValid}>
          다음
        </Button>
      </S.SignupForm>
    </S.SignupSection>
  );
};

export default Signup;
