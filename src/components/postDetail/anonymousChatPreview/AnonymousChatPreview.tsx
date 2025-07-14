import { useNavigate } from "react-router-dom";
import * as S from "./AnonymousChatPreview.styled";
import { Button } from "../../common/button/Button.styled";

interface Props {
  chatRoomId: number; // 또는 string
}

const AnonymousChatPreview = ({ chatRoomId }: Props) => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <div>
        <p>아 나도 이거 필요했는데 ㄷㄷ</p>
        <p>참치 어딘건가요?</p>
      </div>
      <Button onClick={() => navigate(`/anonymousChat/${chatRoomId}`)}>
        채팅방 참여하기
      </Button>
    </S.Container>
  );
};

export default AnonymousChatPreview;
