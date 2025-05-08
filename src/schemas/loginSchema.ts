import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(30, "비밀번호는 최대 30자 이하이어야 합니다.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*+=-])[A-Za-z\d!@#$%^*+=-]{8,30}$/,
      "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다."
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
