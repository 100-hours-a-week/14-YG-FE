declare module "event-source-polyfill" {
  export interface EventSourcePolyfillInit extends EventSourceInit {
    withCredentials?: boolean;
    headers?: Record<string, string>;
    heartbeatTimeout?: number;
    /** ✅ fetch override도 허용 */
    fetch?: typeof fetch;
  }

  export class EventSourcePolyfill implements EventSource {
    constructor(url: string, eventSourceInitDict?: EventSourcePolyfillInit);

    readonly url: string;
    readonly readyState: number;
    readonly withCredentials: boolean;
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;

    onopen: ((ev: Event) => void) | null;
    onmessage: ((ev: MessageEvent) => void) | null;
    onerror: ((ev: Event) => void) | null;

    close(): void;

    addEventListener<K extends keyof EventSourceEventMap>(
      type: K,
      listener: (ev: EventSourceEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions
    ): void;

    removeEventListener<K extends keyof EventSourceEventMap>(
      type: K,
      listener: (ev: EventSourceEventMap[K]) => void,
      options?: boolean | EventListenerOptions
    ): void;

    dispatchEvent(event: Event): boolean;
  }
}
