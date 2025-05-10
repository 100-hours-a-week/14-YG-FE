import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as S from "./UnitAmountSelector.styled";
import Dropdown from "../../common/input/dropdown/Dropdown";
import SelectButtonInput from "../../common/input/selectButtonInput/SelectButtonInput";
import ControlledNumberInput from "../../common/input/controlledNumberInput/ControlledNumberInput";

const UnitAmountSelector = () => {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const totalAmount = watch("totalAmount"); // 상품 전체 수량
  const unitAmount = watch("unitAmount"); // 선택한 주문 단위

  const [unitOptions, setUnitOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [unit, setUnit] = useState(1); // SelectButton용 내부 단위

  // 전체 수량 입력에 따라 약수 옵션 자동 계산
  useEffect(() => {
    const total = Number(totalAmount);
    // ❗️ 숫자 아님 or 2보다 작거나 999보다 크면 계산 스킵
    if (!Number.isInteger(total) || total < 2 || total > 999) {
      setUnitOptions([]);
      return;
    }

    const divisors = [];
    for (let i = 1; i <= total; i++) {
      if (total % i === 0) divisors.push(i);
    }

    setUnitOptions(
      divisors.map((d) => ({
        value: String(d),
        label: `${d}개`,
      }))
    );
  }, [totalAmount]);

  // unitAmount 값이 변경되면 SelectButton에 반영
  useEffect(() => {
    const unitNum = Number(unitAmount);
    if (!isNaN(unitNum)) {
      setUnit(unitNum);
    }
  }, [unitAmount]);

  return (
    <div>
      <S.TotalAmount>
        <ControlledNumberInput
          name="totalAmount"
          control={control}
          label="상품 전체 수량"
          placeholder="상품 전체 수량을 입력해주세요."
          maxDigits={3}
        />
        <Controller
          name="accountBank"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="은행 선택"
              width="85px"
              options={[{ value: "", label: "주문단위" }, ...unitOptions]}
              {...field}
              placeholder="주문단위"
            />
          )}
        />
      </S.TotalAmount>
      {(errors.totalAmount || errors.unitAmount) && (
        <S.HelperText>
          {typeof errors.totalAmount?.message === "string"
            ? errors.totalAmount.message
            : typeof errors.unitAmount?.message === "string"
              ? errors.unitAmount.message
              : ""}
        </S.HelperText>
      )}
      {unitAmount && (
        <S.MyParti>
          <S.Label>공구 참여 수량</S.Label>
          <Controller
            name="hostQuantity"
            control={control}
            defaultValue={unit}
            render={({ field }) => (
              <SelectButtonInput
                unit={unit}
                max={totalAmount}
                initial={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </S.MyParti>
      )}
    </div>
  );
};

export default UnitAmountSelector;
