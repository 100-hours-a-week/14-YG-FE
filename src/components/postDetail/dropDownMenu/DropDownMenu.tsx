import { useState, useRef, useEffect } from "react";
import * as S from "./DropDownMenu.styled";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

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
          <li>공구글 수정</li>
          <li>공구글 삭제</li>
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default DropdownMenu;
