import api from "./instance";

/**
 * S3 Presigned URL 방식으로 이미지 업로드
 * @param files 업로드할 File 배열
 * @returns 업로드된 S3 key 목록
 */
export const uploadImages = async (files: File[]) => {
  const uploadedKeys: string[] = [];

  for (const file of files) {
    // 1. Presigned URL 요청
    const res = await api.get(`/api/image/presign`);
    const { key, url } = res.data;
    console.log(key);
    console.log("uploading", file.name, "to", key);

    // 2. S3에 직접 업로드
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    // 3. 업로드된 key 저장 (imageUrl이 아니라 key를 저장해야 메타데이터 연결됨)
    uploadedKeys.push(key);
  }

  return uploadedKeys; // ex) ["posts/123/550e8400-chicken.png", ...]
};
