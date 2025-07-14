import { useEffect, useState } from "react";
import * as S from "./SelectButtonInput.styled";
import { HelperText } from "../../HelperText.styled";

interface SelectButtonInputProps {
  unit: number; // 수량 증가 단위 (ex: 1, 2, 5 ...)
  min?: number;
  max: number;
  initial?: number;
  onChange?: (value: number) => void;
  mode?: "write" | "edit";
}

const SelectButtonInput = ({
  unit,
  min = unit,
  max,
  initial = unit,
  onChange,
  mode = "write",
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
    if (mode !== "edit") {
      setAmount(unit); // ✅ write 모드일 때만 초기화
    }
  }, [unit, mode]);

  return (
    <S.Container>
      <S.ButtonContainer>
        <S.Button type="button" onClick={handleDecrease}>
          -
        </S.Button>
        <S.Count>{amount}</S.Count>
        <S.Button type="button" onClick={handleIncrease}>
          +
        </S.Button>
      </S.ButtonContainer>
      {helperText && <HelperText>{helperText}</HelperText>}
    </S.Container>
  );
};

export default SelectButtonInput;
