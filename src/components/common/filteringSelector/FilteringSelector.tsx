import * as S from "./FilteringSelector.styled";

export interface FilterSelectorProps<T extends string> {
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
}

const FilterSelector = <T extends string>({
  options,
  selected,
  onSelect,
}: FilterSelectorProps<T>) => {
  return (
    <S.Container>
      {options.map((option) => (
        <S.Button
          key={option}
          $isSelected={selected === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </S.Button>
      ))}
    </S.Container>
  );
};

export default FilterSelector;
