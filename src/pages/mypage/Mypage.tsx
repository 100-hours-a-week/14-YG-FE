import Profile from "../../components/common/profile/Profile";
import * as S from "./Mypage.styled";
import { useDeleteUserMutation } from "../../hooks/mutations/user/useDeleteUserMutation";
import { useModalStore } from "../../stores/useModalStore";
import FilteringTab from "../../components/mypage/filteringTab/FilteringTab";
import { useEffect, useState } from "react";
import { Button } from "../../components/common/button/Button.styled";
import MyList from "../../components/mypage/myList/MyList";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

const Mypage = () => {
  const navigate = useNavigate();
  const { mutate: deleteUser } = useDeleteUserMutation();
  const user = useUserStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);
  const tabOptions = ["참여목록", "주최목록", "관심목록"] as const;
  type TabType = (typeof tabOptions)[number];

  const [activeTab, setActiveTab] = useState<TabType>("참여목록");

  // ✅ 렌더 중이 아니라 useEffect에서 navigate + openModal
  useEffect(() => {
    if (!user) {
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      openModal("login");
      navigate("/", { replace: true }); // replace하면 history에 안 남음
    }
  }, [user, navigate, openModal]);

  // ✅ 조건만으로는 return 막지 말고, 실제 컴포넌트는 렌더하지 않음
  if (!user) return null;

  const handleDeleteUser = () => {
    openModal("confirm", {
      confirmTitle: "정말 탈퇴하시겠습니까?",
      confirmDescription: "탈퇴하시면 회원 정보가 저장되지 않습니다.",
      confirmText: "탈퇴하기",
      cancelText: "돌아가기",
      onConfirm: () => {
        deleteUser();
      },
    });
  };

  return (
    <S.MypageContainer>
      <S.PageName>마이페이지</S.PageName>
      <S.ProfileSection>
        {user && <Profile type="mypage" user={user} />}
        <Button onClick={() => navigate("/editProfile")}>
          프로필 수정하기
        </Button>
      </S.ProfileSection>
      <FilteringTab
        options={tabOptions.slice()}
        selected={activeTab}
        onSelect={setActiveTab}
      />
      <MyList activeTab={activeTab} />
      <S.DeleteUser onClick={handleDeleteUser}>회원탈퇴</S.DeleteUser>
    </S.MypageContainer>
  );
};

export default Mypage;
