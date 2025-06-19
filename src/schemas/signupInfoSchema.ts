import { z } from "zod";
import { checkAccountSchema } from "./checkAccountSchema";

export const signupInfoSchema = checkAccountSchema.merge(
  z.object({
    nickname: z
      .string()
      .min(2, { message: "2자 이상 12자 이하의 닉네임을 입력해주세요" })
      .max(12, { message: "2자 이상 12자 이하의 닉네임을 입력해주세요" }),

    phoneNumber: z.string().regex(/^010\d{8}$/, {
      message: "하이픈(-)을 제외한 올바른 전화번호를 입력해주세요",
    }),

    agree: z.literal(true, {
      errorMap: () => ({
        message: "개인정보 수집에 동의해주세요",
      }),
    }),
  })
);

export type SignupInfoFormData = z.infer<typeof signupInfoSchema>;
