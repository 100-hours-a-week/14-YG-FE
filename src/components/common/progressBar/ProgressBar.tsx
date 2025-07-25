import * as S from "./ProgressBar.styled";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const ratio = Math.min(current / total, 1); // 혹시 current가 total보다 커질 수도 있으니 제한 걸기

  return (
    <S.Wrapper>
      <S.Label>
        모집 현황: {current} / {total}개
      </S.Label>
      <S.BarContainer>
        <S.BarFill ratio={ratio} />
      </S.BarContainer>
    </S.Wrapper>
  );
};

export default ProgressBar;
