import * as S from "./SearchBar.styled";
import Search from "../../../assets/icons/Search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleClickSearch = () => {
    if (keyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <S.SearchBarContainer>
      <S.SearchLine />
      <S.SearchBox>
        <S.SearchText
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <S.SearchIcon
          src={Search}
          alt="search icon"
          onClick={handleClickSearch}
        />
      </S.SearchBox>
      <S.SearchLine />
    </S.SearchBarContainer>
  );
};

export default SearchBar;
