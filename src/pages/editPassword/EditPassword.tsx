import { useForm } from "react-hook-form";
import InputField from "../../components/common/input/inputField/InputField";
import {
  EditPasswordFormData,
  editPasswordSchema,
} from "../../schemas/editPasswordSchema";
import * as S from "../signup/Signup.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditPasswordMutation } from "../../hooks/mutations/user/useEditProfileMutation";
import { Button } from "../../components/common/button/Button.styled";

const EditPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditPasswordFormData>({
    resolver: zodResolver(editPasswordSchema),
    mode: "onChange",
  });

  const { mutate: editPassword } = useEditPasswordMutation();

  const onSubmit = (data: EditPasswordFormData) => {
    const { password } = data;
    editPassword(password);
  };

  return (
    <S.SignupSection>
      <S.SectionName>비밀번호 변경</S.SectionName>
      <S.SignupForm onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="변경할 비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          {...register("password")}
          helperText={errors.password?.message}
        />
        <InputField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          {...register("confirmPassword")}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" disabled={!isValid}>
          수정하기
        </Button>
      </S.SignupForm>
    </S.SignupSection>
  );
};

export default EditPassword;
