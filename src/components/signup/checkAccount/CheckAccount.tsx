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
import { useCheckAccountMutation } from "../../../hooks/mutations/user/useCheckAccountMutation";
import { useUserStore } from "../../../stores/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "../../../stores/useToastStore";

interface CheckAccountProps {
  onSuccess: () => void;
}

const CheckAccount = ({ onSuccess }: CheckAccountProps) => {
  const user = useUserStore((s) => s.user);
  const showToast = useToastStore((s) => s.showToast);
  const navigate = useNavigate();
  const [isAccountChecked, setIsAccountChecked] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(checkAccountSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const accountNumber = watch("accountNumber");
  const accountBank = watch("accountBank");
  const name = watch("name");
  const { mutate: checkingAccount } = useCheckAccountMutation({
    onSuccess: (data) => {
      onSuccess(); // 인증 성공 시 콜백 실행
      console.log(data);
      showToast("본인인증에 성공하였습니다!");
      setIsAccountChecked(true);
    },
    onError: () => {
      alert("본인 명의의 계좌를 올바르게 입력해주세요!");
      setIsAccountChecked(false);
      setIsAuthError(true);
    },
  });

  useEffect(() => {
    if (!user) {
      alert("다시 로그인해주세요!");
      navigate("/");
      return;
    }

    const matchedBank = BANK_OPTIONS.find(
      (bank) => bank.label === user.accountBank
    );

    setValue("name", user.name);
    setValue("accountBank", matchedBank || { label: "은행 선택", value: 0 });
    setValue("accountNumber", user.accountNumber);
  }, [user, setValue, navigate]);

  const onSubmit = (data: CheckAccountFormData) => {
    const params: ConfirmAccountParams = {
      ...data,
      accountBank:
        BANK_OPTIONS.find((bank) => bank.value === data.accountBank?.value)
          ?.label ?? "",
    };
    checkingAccount(params);
    console.log(params);
  };

  useEffect(() => {
    setIsAccountChecked(false);
    setIsAuthError(false);
  }, [accountNumber, accountBank, name]);

  return (
    <S.Container>
      <S.Top>
        <S.StyledIcon src={AccountIcon} />
        계좌 본인인증
      </S.Top>
      <S.FormWrapper>
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
        {isValid && !isAccountChecked && (
          <S.Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isAuthError}
          >
            인증하기
          </S.Button>
        )}
      </S.FormWrapper>
    </S.Container>
  );
};

export default CheckAccount;
