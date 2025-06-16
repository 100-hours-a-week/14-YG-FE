import { useCallback, useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import * as S from "./UnitAmountSelector.styled";
import Dropdown from "../../common/input/dropdown/Dropdown";
import SelectButtonInput from "../../common/input/selectButtonInput/SelectButtonInput";
import ControlledNumberInput from "../../common/input/controlledNumberInput/ControlledNumberInput";

interface UnitAmountSelectorProps {
  disabledFields?: ("totalAmount" | "unitAmount" | "hostQuantity")[];
  mode?: "write" | "edit";
  hostMaxQuantity?: number;
}

const UnitAmountSelector = ({
  disabledFields = [],
  mode = "write",
  hostMaxQuantity,
}: UnitAmountSelectorProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const totalAmount = useWatch({ name: "totalAmount" });
  const unitAmount = useWatch({ name: "unitAmount" });

  const [unitOptions, setUnitOptions] = useState<
    { value: number; label: string }[]
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
        value: d,
        label: `${d}개`,
      }))
    );
  }, [totalAmount]);

  useEffect(() => {
    if (unitOptions.length > 0 && unitAmount) {
      const matched = unitOptions.find((opt) => opt.value === unitAmount);
      if (matched && unitAmount !== matched.value) {
        setValue("unitAmount", matched.value);
      }
    }
  }, [unitOptions, unitAmount, setValue]);

  // unitAmount 값이 변경되면 SelectButton에 반영
  useEffect(() => {
    const unitNum = Number(unitAmount);
    if (!isNaN(unitNum)) {
      setUnit(unitNum);
      setValue("hostQuantity", unitNum);
    }
  }, [unitAmount, setValue]);

  const isDisabled = useCallback(
    (field: "totalAmount" | "unitAmount" | "hostQuantity") =>
      disabledFields?.includes(field),
    [disabledFields]
  );

  useEffect(() => {
    if (mode !== "write") return; // ✅ edit 모드일 땐 아무 것도 하지 않음

    if (isDisabled("totalAmount")) setValue("totalAmount", -1);
    if (isDisabled("unitAmount")) setValue("unitAmount", "");
    if (isDisabled("hostQuantity")) setValue("hostQuantity", 0);
  }, [disabledFields, setValue, isDisabled, mode]);

  return (
    <div>
      <S.TotalAmount>
        <ControlledNumberInput
          name="totalAmount"
          control={control}
          label="상품 전체 수량"
          placeholder="상품 전체 수량을 입력해주세요."
          maxDigits={3}
          disabled={isDisabled("totalAmount")}
        />
        <Controller
          name="unitAmount"
          control={control}
          render={({ field }) => {
            const selectedOption = unitOptions.find(
              (opt) => opt.value === field.value
            ) ?? { value: 0, label: "주문단위" };
            return (
              <Dropdown
                width="170px"
                options={[{ value: 0, label: "주문단위" }, ...unitOptions]}
                value={selectedOption}
                onChange={(selected) => {
                  field.onChange(selected?.value ?? 0); // RHF에 string으로 전달
                }}
                disabled={isDisabled("unitAmount")}
              />
            );
          }}
        />
      </S.TotalAmount>
      {!isDisabled("totalAmount") &&
        !isDisabled("unitAmount") &&
        (errors.totalAmount || unitAmount === "") && (
          <S.HelperText>
            {typeof errors.totalAmount?.message === "string"
              ? errors.totalAmount.message
              : unitAmount === ""
                ? "주문 단위를 선택해주세요."
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
                max={hostMaxQuantity ?? totalAmount}
                min={0}
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
