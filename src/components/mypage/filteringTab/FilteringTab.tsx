import * as S from "./FilteringTab.styled";

export interface FilteringTabProps<T extends string> {
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
}

const FilteringTab = <T extends string>({
  options,
  selected,
  onSelect,
}: FilteringTabProps<T>) => {
  return (
    <S.Container>
      {options.map((option) => (
        <S.TabButton
          key={option}
          $isSelected={selected === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </S.TabButton>
      ))}
    </S.Container>
  );
};

export default FilteringTab;
