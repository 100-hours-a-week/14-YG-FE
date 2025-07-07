import { SectionLine } from "../../components/common/SectionLine.styled";
import SubSection from "../../components/main/subSection/SubSection";
//import TopSection from "../../components/main/topSection/TopSection";
import * as S from "./Main.styled";
import Moong from "../../assets/icons/Moong.svg";
import { Button } from "../../components/common/button/Button.styled";
import SearchBar from "../../components/common/searchBar/SearchBar";

const Main = () => {
  return (
    <>
      <SearchBar />
      <S.Anounce>
        <S.Img src={Moong} />
        <S.Ment>
          <S.Title>뭉산 서비스에 바라는 점을 남겨주세요!</S.Title>
          <S.Info>👇 눌러서 피드백 작성하러 가기</S.Info>
          <S.NoUnderlineLink
            href="https://docs.google.com/forms/d/e/1FAIpQLSf5oe0orUwGo1IYshWAKeAVQ0b2yd0lv0HQpYudOlJIClVN9g/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button $buttonStyle="square" $isMove={true}>
              의견 남기기
            </Button>
          </S.NoUnderlineLink>
        </S.Ment>
      </S.Anounce>
      <S.Container>
        <SubSection title="마감임박" orderBy="due_soon_only" />
        <SectionLine />
        <SubSection title="전체" orderBy="latest" />
        <SectionLine />
        <SubSection
          title="뭉산PICK"
          orderBy="latest"
          category="moongsanPick"
          categoryId={1}
        />
      </S.Container>
    </>
  );
};

export default Main;
