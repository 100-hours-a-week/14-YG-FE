import * as S from "./EditMyInfo.styled";
import * as C from "../signupInfo/SignupInfo.styled";
import InfoForm from "../../components/signup/infoForm/InfoForm";
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
import AccountIcon from "../../assets/images/CheckAccount.png";

const EditMyInfo = () => {
  const methods = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const nickname = watch("nickname") || "";
  const phoneNumber = watch("phoneNumber") || "";
  const [initialNickname, setInitialNickname] = useState("");
  const [initialPhoneNumber, setInitialPhoneNumber] = useState("");

  const isNicknameValid = !errors.nickname;
  const navigate = useNavigate();
  const isPhoneChanged = phoneNumber !== initialPhoneNumber;
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const { data: user } = useMyInfoQuery();
  console.log(user);

  useEffect(() => {
    if (user) {
      setValue("nickname", user.nickname);
      setValue("phoneNumber", user.phoneNumber);
      setInitialNickname(user.nickname); // ✅ 초기 닉네임 저장
      setInitialPhoneNumber(user.phoneNumber);
      setIsNicknameChecked(true); // ✅ 처음엔 확인된 상태로 시작
    }
  }, [user, setValue]);

  const { mutate: editProfile } = useEditInfoMutation();
  const { mutate: checkNickname, isPending: checkingNickname } =
    useNicknameCheckMutation({
      onSuccess: (data) => {
        if (data.isDuplication === "NO") {
          editProfile({ nickname });
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

  const handleNicknameSave = () => {
    checkNickname(nickname);
  };

  const handlePhoneSave = () => {
    editProfile({ phoneNumber });
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
      <S.SectionInfo>
        해당 정보는 <span>주문 및 환불 시 본인 확인</span>을 위해 사용되며
        <br />
        부정확한 경우 환불이 제한될 수 있습니다.
      </S.SectionInfo>
      <FormProvider {...methods}>
        <C.SignupForm onSubmit={handleSubmit(onSubmit)}>
          <InfoForm
            nickname={nickname}
            isNicknameValid={isNicknameValid}
            isNicknameChecked={isNicknameChecked}
            isNicknameDuplicated={isNicknameDuplicated}
            checkingNickname={checkingNickname}
            onCheckNickname={handleNicknameSave}
            onPhoneSave={handlePhoneSave}
            isPhoneChanged={isPhoneChanged}
          />
          <S.AccountInfo onClick={() => navigate("/editProfile/account")}>
            <S.Top>
              <S.StyledIcon src={AccountIcon} />
              계좌정보
            </S.Top>
            <S.InfoBox>
              <p>
                <span>실명 :</span> {user.name}
              </p>
              <p>
                <span>은행명 :</span> {user.accountBank}
              </p>
              <p>
                <span>계좌번호 :</span> {user.accountNumber}
              </p>
            </S.InfoBox>
          </S.AccountInfo>
          <InputField
            onClick={() => navigate("/editProfile/password")}
            label="비밀번호"
            placeholder="비밀번호 변경"
          />
        </C.SignupForm>
      </FormProvider>
    </C.SignupSection>
  );
};

export default EditMyInfo;
