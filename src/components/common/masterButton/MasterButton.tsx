import { useState, useRef, useEffect } from "react";
import * as S from "./MasterButton.styled";
import { useUserStore } from "../../../stores/useUserStore";
import { useModalStore } from "../../../stores/useModalStore";
import { useNavigate } from "react-router-dom";

const MasterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (!user) {
      openModal("refundNotice");
      return;
    }
    setIsOpen((prev) => !prev);
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
      <S.StyledMasterButton onClick={handleToggle}>메뉴</S.StyledMasterButton>
      {isOpen && (
        <S.Dropdown>
          <li
            onClick={() => {
              navigate("/writePost");
            }}
          >
            뭉챗봇
          </li>
          <li
            onClick={() => {
              navigate("/writePost");
            }}
          >
            공구글 작성하기
          </li>
          <li
            onClick={() => {
              navigate("/chat");
            }}
          >
            내 채팅방 보기
          </li>
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default MasterButton;
