import { forwardRef, useState, useRef } from "react";
import * as S from "./ImageUploader.styled";

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

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          console.log("reader result:", result); // ✅ 실제 이미지 DataURL 찍힘
          setPreview(result);
          onChange?.(result, file);
        };
        reader.readAsDataURL(file);
      }

      // react-hook-form 연결
      if (ref) {
        if (typeof ref === "function") ref(e.target);
        else ref.current = e.target;
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
        <S.ImageBox $styleType={styleType} onClick={handleClick}>
          {preview ? <img src={preview} alt="미리보기" /> : <S.StyledUser />}
          <S.StyledCamera />
        </S.ImageBox>
        {helperText && <S.HelperText>{helperText}</S.HelperText>}
      </S.Container>
    );
  }
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
