import * as S from "./Profile.styled";
import 달뭉 from "../../../assets/images/달뭉.webp";
import { UserInfo } from "../../../types/userType";
import { useLogoutMutation } from "../../../hooks/mutations/user/useLogoutMutation";
import { useModalStore } from "../../../stores/useModalStore";
import { useUserStore } from "../../../stores/useUserStore";

interface ProfileProps {
  type: "mypage" | "post";
  user: UserInfo &
    Partial<{
      name: string;
      email: string;
      phoneNumber: string;
    }>;
}

/**
 *
 * @param type - 사용하는 페이지에 따라 'mypage' | 'post'
 * @returns
 */

const Profile = ({ type, user }: ProfileProps) => {
  const { mutate: logout } = useLogoutMutation();
  const openModal = useModalStore((s) => s.openModal);
  const currentUser = useUserStore((s) => s.user);

  const handleLogout = () => {
    openModal("confirm", {
      confirmTitle: "로그아웃하시겠습니까?",
      confirmText: "로그아웃",
      cancelText: "돌아가기",
      onConfirm: () => {
        logout();
      },
    });
  };

  return (
    <S.ProfilePart $type={type}>
      <S.ProfileImg $type={type} src={달뭉} alt="프로필 이미지" />
      <S.ProfileInfo>
        {type === "mypage" && (
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        )}
        <S.NameInfo $type={type}>{user.nickname}</S.NameInfo>
        {type === "mypage" && (
          <>
            <S.RealName>{user.name}</S.RealName>
            <S.Email>{user.email}</S.Email>
            <S.PhoneNumber>{user.phoneNumber}</S.PhoneNumber>
          </>
        )}
        <S.AccountInfo $type={type}>
          {type === "mypage"
            ? `${user.accountBank} ${user.accountNumber}`
            : user.nickname === currentUser?.nickname
              ? `주최자 계좌번호 : ${user.accountBank} ${user.accountNumber}`
              : null}
        </S.AccountInfo>
      </S.ProfileInfo>
    </S.ProfilePart>
  );
};

export default Profile;
