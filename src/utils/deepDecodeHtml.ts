import { decodeHtmlEntities } from "./decodeHtmlEntities";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | Array<JsonValue>;
interface JsonObject {
  [key: string]: JsonValue;
}

/**
 * HTML 엔티티로 인코딩된 모든 문자열을 재귀적으로 디코딩합니다.
 * @param input 디코딩할 객체
 * @returns 디코딩된 객체
 */
export function deepDecodeHtml<T extends JsonValue>(input: T): T {
  if (typeof input === "string") {
    return decodeHtmlEntities(input) as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => deepDecodeHtml(item)) as T;
  }

  if (input && typeof input === "object") {
    const decodedObj: JsonObject = {};
    for (const [key, value] of Object.entries(input)) {
      decodedObj[key] = deepDecodeHtml(value as JsonValue);
    }
    return decodedObj as T;
  }

  return input;
}
