import { zodResolver } from "@hookform/resolvers/zod";
import CheckAccount from "../../components/signup/checkAccount/CheckAccount";
import {
  CheckAccountFormData,
  checkAccountSchema,
} from "../../schemas/checkAccountSchema";
import { FormProvider, useForm } from "react-hook-form";
import { useEditAccountMutation } from "../../hooks/mutations/user/useEditProfileMutation";
import { BANK_OPTIONS } from "../../constants";
import * as S from "./EditAccount.styled";

const EditAccount = () => {
  const methods = useForm<CheckAccountFormData>({
    resolver: zodResolver(checkAccountSchema),
    mode: "onChange",
  });

  const { getValues } = methods;

  const { mutate: editAccount } = useEditAccountMutation();

  const handleAccountVerified = () => {
    const values = getValues();

    const formattedData = {
      ...values,
      accountBank:
        BANK_OPTIONS.find((b) => b.value === values.accountBank?.value)
          ?.label ?? "",
    };

    editAccount(formattedData); // ✅ 가공된 데이터로 전송
  };

  return (
    <S.Container>
      <S.SectionName>실명 및 계좌정보 변경</S.SectionName>
      <FormProvider {...methods}>
        <CheckAccount onSuccess={handleAccountVerified} />
      </FormProvider>
    </S.Container>
  );
};

export default EditAccount;
