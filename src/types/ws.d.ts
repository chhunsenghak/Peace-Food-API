declare module "ws" {
  // Minimal types to satisfy engine.io / socket.io TypeScript declarations.
  // Prefer installing @types/ws when node_modules permissions are fixed.
  export type PerMessageDeflateOptions = unknown;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface WebSocket {}

  const WebSocketConstructor: unknown;
  export default WebSocketConstructor;
}
