import * as S from "./CheckAccount.styled";
import AccountIcon from "../../../assets/images/CheckAccount.png";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckAccountFormData,
  checkAccountSchema,
} from "../../../schemas/checkAccountSchema";
import Dropdown from "../../common/input/dropdown/Dropdown";
import { BANK_OPTIONS } from "../../../constants";
import InputField from "../../common/input/inputField/InputField";
import { ConfirmAccountParams } from "../../../types/userType";
import { useCheckAccountQuery } from "../../../hooks/queries/useCheckAccountQuery";

const CheckAccount = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    //watch,
  } = useForm({
    resolver: zodResolver(checkAccountSchema),
    mode: "onChange",
    shouldUnregister: true,
  });
  const { data: checkingAccount } = useCheckAccountQuery();

  const onSubmit = (data: CheckAccountFormData) => {
    const params: ConfirmAccountParams = {
      ...data,
      accountBank:
        BANK_OPTIONS.find((bank) => bank.value === data.accountBank?.value)
          ?.label ?? "",
    };
    checkingAccount(params);
  };

  return (
    <S.Container>
      <S.Top>
        <S.StyledIcon src={AccountIcon} />
        계좌 본인인증
      </S.Top>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          styleType="checkAccount"
          placeholder="실명 입력"
          {...register("name")}
          helperText={errors?.name?.message}
        />
        <Controller
          name="accountBank"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={[{ label: "은행 선택", value: 0 }, ...BANK_OPTIONS]}
              {...field}
              value={field.value ?? null}
              placeholder="은행 선택"
              helperText={errors.accountBank?.value?.message}
            />
          )}
        />
        <InputField
          styleType="checkAccount"
          placeholder="사용할 계좌번호 입력"
          {...register("accountNumber")}
          helperText={errors.accountNumber?.message}
        />
        <S.Button type="submit" disabled={!isValid}>
          인증하기
        </S.Button>
      </S.Form>
    </S.Container>
  );
};

export default CheckAccount;
