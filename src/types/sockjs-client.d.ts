// src/types/sockjs-client.d.ts
declare module "sockjs-client/dist/sockjs" {
  export default class SockJS {
    constructor(url: string, _unused?: null, options?: SockJSOptions);
    onopen: (() => void) | null;
    onmessage: ((e: { data: string }) => void) | null;
    onclose: (() => void) | null;
    send(data: string): void;
    close(): void;
  }

  interface SockJSOptions {
    protocols_whitelist?: string[];
  }
}
