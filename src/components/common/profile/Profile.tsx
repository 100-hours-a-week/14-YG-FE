import * as S from "./Profile.styled";
import 달뭉 from "../../../assets/images/달뭉.webp";
import { UserInfo } from "../../../types/userType";
import { useLogoutMutation } from "../../../hooks/mutations/user/useLogoutMutation";
import { useModalStore } from "../../../stores/useModalStore";
import { useToastStore } from "../../../stores/useToastStore";
import { useHostAccount } from "../../../hooks/queries/useProductQuery";
import { useUserStore } from "../../../stores/useUserStore";
import DropdownMenu from "../../postDetail/dropDownMenu/DropDownMenu";
import ImageUploader from "../image/imageUploader/ImageUploader";
import { usePatchProfileImgMutation } from "../../../hooks/mutations/user/usePatchProfileImgMutation";
import { uploadImages } from "../../../api/image";
import { getImageUrl } from "./../../../utils/image";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileProps {
  type: "mypage" | "post";
  postId?: number;
  user: UserInfo;
  isParticipant?: boolean;
}

/**
 *
 * @param type - 사용하는 페이지에 따라 'mypage' | 'post'
 * @returns
 */

const Profile = ({ type, postId, user, isParticipant }: ProfileProps) => {
  const { mutate: logout } = useLogoutMutation();
  const openModal = useModalStore((s) => s.openModal);
  const { showToast, isDisabled } = useToastStore();
  const currentUser = useUserStore((s) => s.user);
  const { data: hostAccount, isError } = useHostAccount(Number(postId));
  const { mutate: patchImg } = usePatchProfileImgMutation();
  const queryClient = useQueryClient();

  console.log(user);
  console.log(hostAccount);
  const handleImageChange = async (_url: string, file: File) => {
    try {
      const [uploadedKey] = await uploadImages([file]); // ✅ file 직접 사용
      patchImg(uploadedKey, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["myInfo"] });
        },
      });
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

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

  const handleCopy = () => {
    if (!hostAccount) return;
    if (isDisabled) return;

    navigator.clipboard
      .writeText(hostAccount.accountNumber)
      .then(() => {
        showToast("계좌번호가 복사되었습니다!");
      })
      .catch(() => {
        alert("복사에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <S.ProfilePart $type={type}>
      {type === "post" ? (
        <S.ProfileImg
          src={user.profileImageUrl ? getImageUrl(user.profileImageUrl) : 달뭉}
          alt="프로필 이미지"
        />
      ) : (
        <ImageUploader
          defaultPreview={
            user.profileImageUrl ? getImageUrl(user.profileImageUrl) : 달뭉
          }
          styleType="circle"
          onChange={handleImageChange}
        />
      )}

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
          {type === "post" ? (
            isParticipant && isError ? (
              "계좌 조회가 불가합니다. 관리자에게 문의해주세요."
            ) : !hostAccount ? (
              <>
                주최자 계좌번호 :
                <S.SecretBox>
                  <S.Ment>주문 후 확인가능합니다</S.Ment>
                </S.SecretBox>
              </>
            ) : (
              <>
                주최자 계좌번호 : {hostAccount.accountBank}{" "}
                {hostAccount.accountNumber}
                <S.CopyButton onClick={handleCopy} disabled={isDisabled}>
                  복사
                </S.CopyButton>
              </>
            )
          ) : (
            // mypage일 때
            `${user.accountBank} ${user.accountNumber}`
          )}
        </S.AccountInfo>
      </S.ProfileInfo>
      {user.nickname === currentUser?.nickname && postId && (
        <DropdownMenu postId={postId} />
      )}
    </S.ProfilePart>
  );
};

export default Profile;
