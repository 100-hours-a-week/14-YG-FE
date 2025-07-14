import { useMutation } from "@tanstack/react-query";
import { uploadImages } from "../../../api/image";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      if (!files.length) throw new Error("업로드할 이미지가 없습니다.");
      return await uploadImages(files); // S3 key[] 반환
    },
  });
};
