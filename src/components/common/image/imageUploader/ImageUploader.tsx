import { forwardRef, useState, useRef, useEffect } from "react";
import * as S from "./ImageUploader.styled";
import { useModalStore } from "../../../../stores/useModalStore";
import { useUserStore } from "../../../../stores/useUserStore";
import { patchProfileImg } from "../../../../api/user";
import { useToastStore } from "../../../../stores/useToastStore";
import 달뭉 from "../../../../assets/images/달뭉.webp";

interface ImageUploaderProps {
  helperText?: string;
  styleType?: "circle" | "rect";
  defaultPreview?: string; // 수정 시 기존 이미지 보여주기
  onChange?: (previewUrl: string, file: File) => void;
}

const ImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(
  (props, ref) => {
    const {
      helperText,
      styleType = "rect",
      defaultPreview = "",
      onChange,
      ...restProps
    } = props;
    const [preview, setPreview] = useState<string | null>(
      defaultPreview || null
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const showToast = useToastStore((s) => s.showToast);
    const user = useUserStore((s) => s.user);
    const openModal = useModalStore((s) => s.openModal);

    const handleToggle = () => {
      if (!user) {
        openModal("login");
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreview(result);
          onChange?.(result, file);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <S.Container>
        <S.Input
          type="file"
          accept="image/*"
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          onChange={handleChange} // ✅ 이벤트 객체는 내부 처리로만
          {...restProps}
        />
        <S.ImageBox $styleType={styleType}>
          {preview ? <img src={preview} alt="미리보기" /> : <S.StyledUser />}
          <S.StyledCamera onClick={handleToggle} />
        </S.ImageBox>
        {isOpen && (
          <S.Dropdown ref={menuRef}>
            <li
              onClick={() => {
                setIsOpen(false);
                handleClick();
              }}
            >
              이미지 변경
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
                setPreview(달뭉); // 🔁 미리보기 제거
                patchProfileImg(""); // 🔁 서버에 빈 이미지 key로 PATCH 요청
                showToast("기본 이미지로 변경되었습니다!");
              }}
            >
              이미지 삭제
            </li>
          </S.Dropdown>
        )}
        {helperText && <S.HelperText>{helperText}</S.HelperText>}
      </S.Container>
    );
  }
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
