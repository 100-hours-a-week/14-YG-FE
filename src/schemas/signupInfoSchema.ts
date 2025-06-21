import { z } from "zod";

export const signupInfoSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "2자 이상 12자 이하의 닉네임을 입력해주세요" })
    .max(12, { message: "2자 이상 12자 이하의 닉네임을 입력해주세요" }),

  phoneNumber: z.string().regex(/^010\d{8}$/, {
    message: "하이픈(-)을 제외한 올바른 전화번호를 입력해주세요",
  }),
  name: z
    .string()
    .min(2, {
      message: "2자 이상의 올바른 실명을 입력해주세요.",
    })
    .max(50, { message: "50자 이하의 올바른 실명을 입력해주세요" })
    .regex(/^[가-힣a-zA-Z\s]+$/, {
      message: "이름은 한글 또는 영문만 입력할 수 있어요",
    }),

  accountBank: z.object({
    label: z.string(),
    value: z.number().min(1, "서비스에 사용할 은행을 선택해주세요"),
  }),
  accountNumber: z.string().regex(/^\d{10,14}$/, {
    message: "하이픈(-)을 제외한 올바른 계좌번호를 입력해 주세요",
  }),

  agree: z.literal(true, {
    errorMap: () => ({
      message: "개인정보 수집에 동의해주세요",
    }),
  }),
});

export type SignupInfoFormData = z.infer<typeof signupInfoSchema>;
