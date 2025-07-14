import { getImageUrl } from "../../../../utils/image";
import LikeToggle from "../../likeToggle/LikeToggle";
import * as S from "./ImageSlider.styled";
import { useState } from "react";

//const images = [참치1, 참치2];

interface ImageSliderProps {
  postId: number;
  images: string[];
}

const ImageSlider = ({ postId, images }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  // 터치 움직임
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // 터치 끝났을 때
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;

      if (diff > 50) goToNext();
      if (diff < -50) goToPrev();
    }

    // 초기화
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <S.ImageSliderContainer>
      <S.ImagePart
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentIndex !== 0 && <S.StyledLeftArrow onClick={handlePrev} />}
        <S.ImageContainer
          src={getImageUrl(images[currentIndex])}
        ></S.ImageContainer>
        {currentIndex !== images.length - 1 && (
          <S.StyledRightArrow onClick={handleNext} />
        )}
      </S.ImagePart>
      <S.SlideIcon>
        {images.map((_, index) => (
          <S.Indicator key={index} $isSelected={currentIndex === index} />
        ))}
      </S.SlideIcon>
      <LikeToggle postId={postId} imageType="full" />
    </S.ImageSliderContainer>
  );
};

export default ImageSlider;
