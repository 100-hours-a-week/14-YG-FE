import { z } from "zod";
import { checkAccountSchema } from "./checkAccountSchema";

export const editProfileSchema = checkAccountSchema.merge(
  z.object({
    nickname: z
      .string()
      .min(2, { message: "2자 이상 12자 이하의 닉네임을 입력해주세요" })
      .max(12, { message: "2자 이상 12자 이하의 닉네임을 입력해주세요" }),

    phoneNumber: z.string().regex(/^010\d{8}$/, {
      message: "하이픈(-)을 제외한 올바른 전화번호를 입력해주세요",
    }),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(30, "비밀번호는 최대 30자 이하이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*+=-])[A-Za-z\d!@#$%^*+=-]{8,30}$/,
        "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다."
      ),
  })
);

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
