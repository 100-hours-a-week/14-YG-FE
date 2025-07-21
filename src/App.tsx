import { useLocation } from "react-router-dom";
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
import { useNotificationSSE } from "./hooks/useNotificationSSE";

const App = () => {
  //const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUserStore((s) => s.user);
  const openedModal = useModalStore((s) => s.openedModal);
  const payload = useModalStore((s) => s.payload);
  const openModal = useModalStore((s) => s.openModal);
  const isModalOpen = Boolean(openedModal);
  useNotificationSSE();

  const { data, isLoading, isSuccess } = useMyInfoQuery(); // ✅ 그냥 호출만 하면 됨

  useEffect(() => {
    const protectedPaths = ["/writePost", "/editPost", "/mypage"];
    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isLoading) return;

    if (!isLoading && isSuccess && !user && isProtected) {
      openModal("login");
    }

    console.log(user);
  }, [data, pathname, isLoading, isSuccess, user, openModal]);

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
        {(pathname === "/" ||
          pathname === "/mypage" ||
          pathname === "/products") && <MasterButton />}
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
