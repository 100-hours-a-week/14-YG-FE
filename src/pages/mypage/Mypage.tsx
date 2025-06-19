import Profile from "../../components/common/profile/Profile";
import * as S from "./Mypage.styled";
import { useDeleteUserMutation } from "../../hooks/mutations/user/useDeleteUserMutation";
import { useMyInfoQuery } from "../../hooks/queries/useMyInfoQuery";
import { useModalStore } from "../../stores/useModalStore";
import Loading from "../../components/common/loading/Loding";
import FilteringTab from "../../components/mypage/filteringTab/FilteringTab";
import { useState } from "react";
import { Button } from "../../components/common/button/Button.styled";
import MyList from "../../components/mypage/myList/MyList";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const { mutate: deleteUser } = useDeleteUserMutation();
  const { data: user, isLoading } = useMyInfoQuery();
  const openModal = useModalStore((s) => s.openModal);
  const tabOptions = ["참여목록", "주최목록", "관심목록"] as const;
  type TabType = (typeof tabOptions)[number];

  const [activeTab, setActiveTab] = useState<TabType>("참여목록");

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

  if (isLoading) return <Loading message="탈퇴 처리중입니다" />;

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
