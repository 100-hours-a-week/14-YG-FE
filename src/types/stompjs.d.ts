declare module "@stomp/stompjs" {
  export interface IMessage {
    body: string;
    headers: Record<string, string>;
    ack: () => void;
    nack: () => void;
  }

  export interface IFrame {
    command: string;
    headers: Record<string, string>;
    body: string;
  }

  export interface StompSubscription {
    id: string;
    unsubscribe: () => void;
  }

  export interface Client {
    debug?: (msg: string) => void;
    connect: (
      headers: Record<string, string>,
      onConnect: (frame: IFrame) => void,
      onError?: (frame: IFrame | CloseEvent) => void
    ) => void;
    disconnect: (onDisconnect?: () => void) => void;
    send: (
      destination: string,
      headers: Record<string, string>,
      body: string
    ) => void;
    subscribe: (
      destination: string,
      callback: (message: IMessage) => void
    ) => StompSubscription;
    connected: boolean;
  }

  export const Stomp: {
    over: (wsFactory: (() => WebSocket) | WebSocket) => Client;
  };
}
