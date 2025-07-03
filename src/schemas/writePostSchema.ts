import { z } from "zod";

export const writePostSchema = z.object({
  // 제목: 1자 이상 100자 이하, 특수문자/이모지 가능
  title: z
    .string()
    .min(1, "공구글 제목은 최소 1자 이상이어야 합니다.")
    .max(100, "공구글 제목은 30자 이내로 작성해야 합니다."),

  // 상품 이름: 1자 이상 100자 이하, 특수문자/이모지 가능
  name: z
    .string()
    .min(1, "상품 이름을 입력해 주세요.")
    .max(100, "상품 이름은 100자 이내로 작성해야 합니다."),

  // 상품 전체 수량: 2 ~ 999
  totalAmount: z.coerce
    .number()
    .int("정수만 입력 가능합니다.")
    .min(2, "상품 전체 수량은 2개 이상이어야 합니다.")
    .max(999, "더이상 입력할 수 없습니다."),

  unitAmount: z.coerce
    .number()
    .int("정수만 입력 가능합니다.")
    .gt(0, "주문 단위를 선택해주세요."),

  // 주최자 예상 구매 수량 (제한 없음)
  hostQuantity: z.coerce.number().int("정수만 입력 가능합니다."),

  // 마감일
  dueDate: z.coerce.date({
    errorMap: () => ({ message: "마감 일자를 선택해 주세요." }),
  }),

  // 픽업일
  pickupDate: z.coerce.date({
    errorMap: () => ({ message: "픽업 일자를 선택해 주세요." }),
  }),

  // 제품 URL: 선택사항
  url: z
    .string()
    .url("올바른 URL 형식이 아니에요.")
    .optional()
    .or(z.literal("")),

  // 전체 가격: 1 이상 필수
  price: z.coerce
    .number({
      errorMap: () => ({ message: "숫자만 입력 가능합니다." }),
    })
    .int("정수만 입력 가능합니다.")
    .min(1, "상품 전체 가격을 입력해 주세요.")
    .max(999_999_999, "더이상 입력할 수 없습니다."),

  description: z
    .string()
    .min(2, "상품 설명은 2자 이상 1000자 이내여야 합니다.")
    .max(1000, "설명란은 1000자 이내로 작성해야 합니다."),

  // 이미지: 최소 1장 이상
  imageUrls: z
    .array(z.string().min(1))
    .min(1, "이미지를 1장 이상 업로드해 주세요."),
});

export type PostFormData = z.infer<typeof writePostSchema>;
