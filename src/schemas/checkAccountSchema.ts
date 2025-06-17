import { z } from "zod";

export const checkAccountSchema = z.object({
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
});

export type CheckAccountFormData = z.infer<typeof checkAccountSchema>;
