import * as S from "./Header.styled";
import Logo from "../../../assets/icons/Logo.svg";
import Service from "../../../assets/icons/Service.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalStore } from "../../../stores/useModalStore";
import { useUserStore } from "../../../stores/useUserStore";
const Header = () => {
  const openModal = useModalStore((s) => s.openModal);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUserStore((s) => s.user);

  const handleLogoClick = () => {
    if (pathname === "/signup" || pathname === "/signupInfo") {
      openModal("confirm", {
        confirmTitle: "정말 나가시겠어요?",
        confirmDescription: "작성 중인 정보가 저장되지 않습니다.",
        confirmText: "나가기",
        cancelText: "계속 작성하기",
        onConfirm: () => {
          navigate("/");
          localStorage.removeItem("signupStep1");
        },
      });
    } else {
      navigate("/");
    }
  };

  const handleGoBack = () => {
    if (pathname === "/signup" || pathname === "/signupInfo") {
      openModal("confirm", {
        confirmTitle: "정말 나가시겠어요?",
        confirmDescription: "작성 중인 정보가 저장되지 않습니다.",
        confirmText: "나가기",
        cancelText: "계속 작성하기",
        onConfirm: () => {
          navigate("/");
          localStorage.removeItem("signupStep1");
        },
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <S.HeaderContainer>
      {pathname !== "/" && <S.GoBack onClick={handleGoBack} />}
      {pathname === "/chat" ? (
        <S.LogoPart>채팅 리스트</S.LogoPart>
      ) : (
        <S.LogoPart onClick={handleLogoClick}>
          <img src={Logo} alt="logo" />
          <S.ServiceName src={Service} />
        </S.LogoPart>
      )}
      <S.SidePart>
        {/*<S.AlertIcon src={Bell} alt="alert" />*/}
        {pathname !== "/mypage" && (
          <S.ProfileIcon
            onClick={() => {
              if (!user) {
                openModal("login"); // 로그인 안 한 경우
              } else {
                navigate("/mypage"); // 로그인 한 경우
              }
            }}
          />
        )}
      </S.SidePart>
    </S.HeaderContainer>
  );
};

export default Header;
