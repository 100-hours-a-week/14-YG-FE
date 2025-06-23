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
import Toast from "./components/common/toast/Toast";
import MasterButton from "./components/common/masterButton/MasterButton";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUserStore((s) => s.user);
  const openedModal = useModalStore((s) => s.openedModal);
  const payload = useModalStore((s) => s.payload);
  const openModal = useModalStore((s) => s.openModal);
  const isModalOpen = Boolean(openedModal);
  const { data, isLoading } = useMyInfoQuery();

  useEffect(() => {
    const protectedPaths = ["/writePost", "/editPost", "/mypage"];
    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    // ✅ 쿼리 로딩 중엔 아무것도 하지 않음
    if (isLoading) return;

    // ✅ 쿼리 끝났고 user가 없으면 리다이렉트
    if ((!data || !user) && isProtected) {
      alert("다시 로그인 해주세요.");
      openModal("login");
    }
    console.log(user?.nickname);
  }, [data, pathname, isLoading, navigate, user, openModal]);

  return (
    <S.Whole>
      <WebBackground />
      <S.MainContainer>
        <Header />
        <S.ScrollArea $modalOpen={isModalOpen} id="main-container">
          {pathname !== "/" &&
            pathname !== "/products" &&
            !pathname.startsWith("/products/category/") && <SectionLine />}
          {isLoading ? <Loading /> : <AppRouter />}
        </S.ScrollArea>
        {pathname === "/" && <MasterButton />}
        {openedModal === "login" && <LoginModal />}
        {openedModal === "confirm" && <ConfirmModal />}
        {openedModal === "order" && user && <OrderModal />}
        {openedModal === "success" && (
          <SuccessModal postId={(payload as { postId: number })?.postId} />
        )}
        {openedModal === "host" && <HostModal />}
        <Toast />
      </S.MainContainer>
    </S.Whole>
  );
};

export default App;
