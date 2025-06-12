import { useEffect, useRef, useState } from "react";
import * as S from "./MultiImageUploader.styled";
import PlusButton from "../../../assets/icons/PlusSquare.svg?react";
import { HelperText } from "../../common/HelperText.styled";

interface ImageData {
  id: string;
  file: File;
  preview: string;
  isMain: boolean;
}

interface MultiImageUploaderProps {
  onChange: (urls: string[], files: File[]) => void;
  defaultPreviewUrls?: string[];
  helperText?: string;
}

const MultiImageUploader = ({
  onChange,
  defaultPreviewUrls,
  helperText,
}: MultiImageUploaderProps) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (
      defaultPreviewUrls &&
      defaultPreviewUrls.length > 0 &&
      !initialized.current
    ) {
      const defaults: ImageData[] = defaultPreviewUrls
        .filter((url) => url !== "") // 빈 값 필터링
        .map((url, i) => ({
          id: crypto.randomUUID(),
          file: new File([], "server-image.jpg"), // ❗ 이건 edit 용도에만 있어야 함
          preview: url,
          isMain: i === 0,
        }));

      if (defaults.length > 0) {
        setImages(defaults);
        initialized.current = true;
      }
    }
  }, [defaultPreviewUrls]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || images.length >= 5) return;

    const filesArray = Array.from(files);
    const readers = filesArray.map((file) => {
      return new Promise<ImageData>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: crypto.randomUUID(),
            file,
            preview: reader.result as string,
            isMain: false, // 대표 사진은 후처리로 지정
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      setImages((prev) => {
        const merged = [...prev, ...newImages].slice(0, 5); // ✅ 여기서 자르기
        if (!merged.some((img) => img.isMain) && merged.length > 0) {
          merged[0].isMain = true;
        }

        const updatedUrls = merged.map((img) => img.preview);
        const updatedFiles = merged.map((img) => img.file);
        onChange(updatedUrls, updatedFiles);

        return merged;
      });
    });

    e.target.value = ""; // 같은 파일 재선택 가능하게 초기화
  };

  const handleDelete = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      if (!updated.some((img) => img.isMain) && updated.length > 0) {
        updated[0].isMain = true;
      }

      // ✅ 이미지 삭제 후 onChange 재호출
      const updatedUrls = updated.map((img) => img.preview);
      const updatedFiles = updated
        .map((img) => img.file)
        .filter((file) => file.size > 0);

      onChange(updatedUrls, updatedFiles);

      return updated;
    });
  };

  return (
    <S.Container>
      <S.ScrollWrapper>
        {images.length < 5 && (
          <S.AddBox onClick={() => inputRef.current?.click()}>
            <PlusButton />
            <div>{images.length}/5</div>
          </S.AddBox>
        )}

        {images.map((img) => (
          <S.ImageBox key={img.id}>
            <S.DeleteBtn onClick={() => handleDelete(img.id)}>X</S.DeleteBtn>
            <img src={img.preview} alt="preview" />
            {img.isMain && <S.Label>대표 사진</S.Label>}
          </S.ImageBox>
        ))}
      </S.ScrollWrapper>
      <HelperText>{helperText}</HelperText>
      {/* 숨겨진 input */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleUpload}
      />
    </S.Container>
  );
};

export default MultiImageUploader;
