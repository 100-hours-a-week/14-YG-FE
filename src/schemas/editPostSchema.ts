import { z } from "zod";
import { writePostSchema } from "./writePostSchema";

export const editPostSchema = writePostSchema
  .extend({
    dateModificationReason: z
      .string()
      .min(
        2,
        "픽업일 변경 사유를 2자 이상 입력해주세요. 참여자들에게 채팅방으로 공지됩니다."
      )
      .max(50, "사유를 50자 이내로 작성해주세요.")
      .optional(),
    originalPickupDate: z.date(), // ✅ 내부 비교용 필드 (UI에 안 보여줘도 됨)
  })
  .superRefine((data, ctx) => {
    const newDate = data.pickupDate.toISOString().slice(0, 10);
    const oldDate = data.originalPickupDate.toISOString().slice(0, 10);

    if (newDate !== oldDate && !data.dateModificationReason) {
      ctx.addIssue({
        path: ["dateModificationReason"],
        code: "custom",
        message:
          "픽업일 변경 사유를 입력해주세요. 참여자들에게 채팅방으로 공지됩니다.",
      });
    }
  });

export type EditPostFormData = z.infer<typeof editPostSchema>;
