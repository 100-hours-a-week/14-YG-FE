import { useEffect, useState } from "react";
import * as S from "./SelectButtonInput.styled";
import { HelperText } from "../../HelperText.styled";

interface SelectButtonInputProps {
  unit: number; // 수량 증가 단위 (ex: 1, 2, 5 ...)
  min?: number;
  max: number;
  initial?: number;
  onChange?: (value: number) => void;
}

const SelectButtonInput = ({
  unit,
  min = unit,
  max,
  initial = unit,
  onChange,
}: SelectButtonInputProps) => {
  const [amount, setAmount] = useState(initial);
  const [helperText, setHelperText] = useState("");

  const handleDecrease = () => {
    if (amount <= min) {
      setHelperText("주문 가능한 최소 수량입니다⚠️");
      return;
    }
    const next = Math.max(min, amount - unit);
    setAmount(next);
    setHelperText("");
    onChange?.(next);
  };

  const handleIncrease = () => {
    if (amount >= max) {
      setHelperText("주문 가능한 최대 수량입니다⚠️");
      return;
    }
    const next = Math.min(max, amount + unit);
    setAmount(next);
    setHelperText("");
    onChange?.(next);
  };

  useEffect(() => {
    setAmount(unit); // 또는 setAmount(unit)도 가능
  }, [unit]);

  return (
    <S.Container>
      <S.ButtonContainer>
        <S.Button onClick={handleDecrease}>-</S.Button>
        <S.Count>{amount}</S.Count>
        <S.Button onClick={handleIncrease}>+</S.Button>
      </S.ButtonContainer>
      {helperText && <HelperText>{helperText}</HelperText>}
    </S.Container>
  );
};

export default SelectButtonInput;
