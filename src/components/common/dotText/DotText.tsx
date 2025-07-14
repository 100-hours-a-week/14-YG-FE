import { DotIcon } from "../DotIcon.styled";
import * as S from "./DotText.styled";

interface DotTextProps {
  text: React.ReactNode;
}

const DotText = ({ text }: DotTextProps) => {
  return (
    <S.Container>
      <DotIcon />
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default DotText;
