import { useModalStore } from "../../../../stores/useModalStore";
import Button from "../../button/Button";
import InputField from "../../input/inputField/InputField";
import Modal from "../Modal";
import Logo from "../../../../assets/icons/Logo.svg";
import Service from "../../../../assets/icons/Service.svg";
import * as S from "./LoginModal.stlyed";
import { useNavigate } from "react-router-dom";
import { LoginFormData, loginSchema } from "../../../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../../../hooks/mutations/user/useLoginMutation";

const LoginModal = () => {
  const navigate = useNavigate();
  const closeModal = useModalStore((s) => s.closeModal);
  const { mutate: loginMutate, isPending } = useLoginMutation();

  const handleKakaoLogin = () => {
    const kakaoRestKey = import.meta.env.VITE_KAKAO_REST_KEY;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestKey}&redirect_uri=${redirectUri}&response_type=code`;

    // 카카오 로그인 페이지로 이동
    window.location.href = kauthUrl;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutate(data);
  };

  const handleSignupClick = () => {
    closeModal(); // 모달 닫기
    navigate("/signup"); // 페이지 이동
  };

  return (
    <Modal onClose={closeModal}>
      <S.Container>
        <S.StyledXIcon onClick={closeModal} />
        <S.LogoPart>
          <img src={Logo} alt="logo" />
          <S.ServiceName src={Service} />
        </S.LogoPart>
        <S.Label>로그인</S.Label>
        <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
          <InputField
            placeholder="이메일을 입력해주세요"
            styleType="login"
            {...register("email")}
            helperText={errors.email?.message}
          />
          <InputField
            placeholder="PW"
            type="password"
            styleType="login"
            {...register("password")}
            helperText={errors.password?.message}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "확인중입니다..." : "로그인"}
          </Button>
        </S.LoginForm>
        <S.KakaoLoginButton onClick={handleKakaoLogin}>
          <S.KakaoLogo />
          카카오로 바로 시작하기
        </S.KakaoLoginButton>
        <S.NaviSignup onClick={handleSignupClick}>회원가입</S.NaviSignup>
      </S.Container>
    </Modal>
  );
};

export default LoginModal;
