// utils/stripTrailingBr.ts
export function stripTrailingBr(html: string): string {
  return html.replace(/(<br\/?>\s*)+$/gi, "");
}
