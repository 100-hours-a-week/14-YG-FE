/**
 * HTML 엔티티(예: &#x1F60B;, &amp;)를 실제 문자로 디코딩합니다.
 * @param encodedStr 디코딩할 문자열
 * @returns 디코딩된 문자열
 */
export function decodeHtmlEntities(encodedStr: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = encodedStr;
  return textarea.value;
}
