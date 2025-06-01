import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./App.styled";
import Header from "./components/common/header/Header";
import ConfirmModal from "./components/common/modal/confirmModal/ConfirmModal";
import LoginModal from "./components/common/modal/loginModal/LoginModal";
import OrderModal from "./components/common/modal/orderModal/OrderModal";
import AppRouter from "./Router";
import { useModalStore } from "./stores/useModalStore";
import { useUserStore } from "./stores/useUserStore";
import { useMyInfoQuery } from "./hooks/queries/useMyInfoQuery";
import WebBackground from "./components/common/webBackgound/WebBackground";
import { useEffect } from "react";
import Loading from "./components/common/loading/Loding";
import SuccessModal from "./components/common/modal/successModal/SuccessModal";
import { SectionLine } from "./components/common/SectionLine.styled";
import HostModal from "./components/common/modal/hostModal/HostModal";

const App = () => {
  const openModal = useModalStore((s) => s.openModal);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUserStore((s) => s.user);
  const openedModal = useModalStore((s) => s.openedModal);
  const isModalOpen = Boolean(openedModal);
  const { data, isLoading } = useMyInfoQuery();

  useEffect(() => {
    const protectedPaths = ["/writePost", "/mypage"];
    const isProtected = protectedPaths.includes(pathname);

    // ✅ 쿼리 로딩 중엔 아무것도 하지 않음
    if (isLoading) return;

    // ✅ 쿼리 끝났고 user가 없으면 리다이렉트
    if (!data && isProtected) {
      alert("다시 로그인 해주세요.");
      navigate("/");
    }
    console.log(user?.nickname);
  }, [data, pathname, isLoading, navigate, user]);

  return (
    <S.Whole>
      <WebBackground />
      <S.MainContainer>
        <S.ScrollArea $modalOpen={isModalOpen} id="main-container">
          <Header />
          {pathname !== "/" &&
            pathname !== "/products" &&
            !pathname.startsWith("/products/category/") && <SectionLine />}
          {isLoading ? <Loading /> : <AppRouter />}
        </S.ScrollArea>

        {pathname === "/" && (
          <S.MasterButton
            onClick={() => {
              if (!user) {
                openModal("login");
              } else {
                navigate("/writePost");
              }
            }}
          />
        )}

        {openedModal === "login" && <LoginModal />}
        {openedModal === "confirm" && <ConfirmModal />}
        {openedModal === "order" && user && <OrderModal />}
        {openedModal === "success" && <SuccessModal />}
        {openedModal === "host" && <HostModal />}
      </S.MainContainer>
    </S.Whole>
  );
};

export default App;
