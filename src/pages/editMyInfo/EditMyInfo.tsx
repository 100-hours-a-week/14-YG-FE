//import * as S from "./EditMyInfo.styled";
import * as C from "../signupInfo/SignupInfo.styled";
import InfoForm from "../../components/signup/infoForm/InfoForm";
import { Button } from "../../components/common/button/Button.styled";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditProfileFormData,
  editProfileSchema,
} from "../../schemas/editProfileSchema";
import { useEffect, useState } from "react";
import InputField from "../../components/common/input/inputField/InputField";
import { useNicknameCheckMutation } from "../../hooks/mutations/user/useNicknameCheckMutation";
import { useEditInfoMutation } from "../../hooks/mutations/user/useEditProfileMutation";
import { useNavigate } from "react-router-dom";
import { useMyInfoQuery } from "../../hooks/queries/useMyInfoQuery";

const EditMyInfo = () => {
  const methods = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = methods;

  const nickname = watch("nickname") || "";
  const [initialNickname, setInitialNickname] = useState("");

  const isNicknameValid = !errors.nickname;
  const navigate = useNavigate();
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(true);
  const { data: user } = useMyInfoQuery();
  console.log(user);

  useEffect(() => {
    if (user) {
      setValue("nickname", user.nickname);
      setValue("phoneNumber", user.phoneNumber);
      setInitialNickname(user.nickname); // ✅ 초기 닉네임 저장
      setIsNicknameChecked(true); // ✅ 처음엔 확인된 상태로 시작
    }
  }, [user, setValue]);

  const { mutate: editProfile, isPending: waitingEdit } = useEditInfoMutation();
  const { mutate: checkNickname, isPending: checkingNickname } =
    useNicknameCheckMutation({
      onSuccess: (data) => {
        if (data.isDuplication === "NO") {
          setIsNicknameChecked(true);
          setIsNicknameDuplicated(false);
        } else {
          setIsNicknameChecked(false);
          setIsNicknameDuplicated(true);
        }
      },
      onError: () => {
        setIsNicknameChecked(false);
        setIsNicknameDuplicated(false);
      },
    });

  const isFormValid = isValid && isAccountVerified;

  const handleClick = () => {
    checkNickname(nickname);
  };

  useEffect(() => {
    if (initialNickname && nickname !== initialNickname) {
      setIsNicknameChecked(false);
      setIsNicknameDuplicated(false);
    } else {
      setIsNicknameChecked(true);
      setIsNicknameDuplicated(false);
    }
  }, [nickname, initialNickname]);

  const onSubmit = async (data: EditProfileFormData) => {
    if (!user) {
      alert("다시 로그인해주세요!");
      navigate("/");
      return;
    }

    const requestData = {
      nickname: data.nickname,
      phoneNumber: data.phoneNumber,
    };

    editProfile(requestData);
  };

  return (
    <C.SignupSection>
      <C.SectionName>내 정보 수정</C.SectionName>
      <FormProvider {...methods}>
        <C.SignupForm onSubmit={handleSubmit(onSubmit)}>
          <InfoForm
            nickname={nickname}
            isNicknameValid={isNicknameValid}
            isNicknameChecked={isNicknameChecked}
            isNicknameDuplicated={isNicknameDuplicated}
            checkingNickname={checkingNickname}
            onCheckNickname={handleClick}
            setIsAccountVerified={setIsAccountVerified}
          />
          <InputField
            onClick={() => navigate("/editProfile/password")}
            label="비밀번호"
            placeholder="비밀번호 변경"
            {...register("password")}
            helperText={errors?.password?.message}
          />
          <Button type="submit" disabled={!isFormValid || waitingEdit}>
            {waitingEdit ? "정보 저장 중..." : "저장하기"}
          </Button>
        </C.SignupForm>
      </FormProvider>
    </C.SignupSection>
  );
};

export default EditMyInfo;
