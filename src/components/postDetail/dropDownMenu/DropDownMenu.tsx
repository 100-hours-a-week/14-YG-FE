import { useState, useRef, useEffect } from "react";
import * as S from "./DropDownMenu.styled";
import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../../../hooks/mutations/host/useDeletePostMutation";
import { useModalStore } from "../../../stores/useModalStore";

interface DropdownMenuProps {
  postId: number;
}

const DropdownMenu = ({ postId }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { mutate: deletePost } = useDeletePostMutation();
  const openModal = useModalStore((s) => s.openModal);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleDelete = () => {
    openModal("confirm", {
      confirmTitle: "정말 삭제하시겠습니까?",
      confirmDescription: "삭제 후 게시글을 복구할 수 없습니다.",
      confirmText: "삭제하기",
      onConfirm: () => deletePost(postId),
    });
  };

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <S.Container ref={menuRef}>
      <S.StyledMenuButton onClick={handleToggle}>메뉴</S.StyledMenuButton>
      {isOpen && (
        <S.Dropdown>
          <li
            onClick={() => {
              navigate(`/editPost/${postId}`);
            }}
          >
            공구글 수정
          </li>
          <li onClick={handleDelete}>공구글 삭제</li>
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default DropdownMenu;
