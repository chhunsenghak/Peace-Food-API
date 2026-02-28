import type { Server as HttpServer } from "http";
import { Server as SocketIOServer, type Socket } from "socket.io";

let io: SocketIOServer | undefined;

export const RealtimeRooms = {
  visitors: "visitors",
  queues: "queues",
  visitor: (visitorId: string) => `visitor:${visitorId}`,
  queue: (queueId: string) => `queue:${queueId}`,
} as const;

type IdRoomPrefix = "visitor" | "queue";

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toIdRoom(prefix: IdRoomPrefix, id: unknown): string | undefined {
  const str = asNonEmptyString(id);
  if (!str) return undefined;
  return `${prefix}:${str}`;
}

function tryGetIO(): SocketIOServer | undefined {
  return io;
}

function emitTo(room: string, event: string, payload: unknown): void {
  const current = tryGetIO();
  if (!current) return;
  current.to(room).emit(event, payload);
}

export function initSocket(server: HttpServer): SocketIOServer {
  io = new SocketIOServer(server, {
    // If you have a frontend on another origin, configure it here.
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    // eslint-disable-next-line no-console
    console.log("Socket connected:", socket.id);

    // Global subscriptions
    socket.on("visitors:subscribe", () => {
      socket.join(RealtimeRooms.visitors);
      socket.emit("visitors:subscribed");
    });

    socket.on("queues:subscribe", () => {
      socket.join(RealtimeRooms.queues);
      socket.emit("queues:subscribed");
    });

    // Optional per-entity subscriptions (handy for detail pages)
    socket.on("visitor:subscribe", (payload: { visitorId?: unknown }) => {
      const room = toIdRoom("visitor", payload?.visitorId);
      if (!room) return;
      socket.join(room);
      socket.emit("visitor:subscribed", { room });
    });

    socket.on("queue:subscribe", (payload: { queueId?: unknown }) => {
      const room = toIdRoom("queue", payload?.queueId);
      if (!room) return;
      socket.join(room);
      socket.emit("queue:subscribed", { room });
    });

    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.on("disconnect", (reason) => {
      // eslint-disable-next-line no-console
      console.log("Socket disconnected:", socket.id, reason);
    });
  });

  return io;
}

export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.IO not initialized. Call initSocket(server) first.");
  }
  return io;
}

// Domain event helpers (used by services/controllers)
export function emitVisitorCreated(visitor: unknown): void {
  emitTo(RealtimeRooms.visitors, "visitor:created", { data: visitor });
}

export function emitVisitorDeleted(visitor: unknown): void {
  emitTo(RealtimeRooms.visitors, "visitor:deleted", { data: visitor });
}

export function emitQueueCreated(queue: unknown): void {
  emitTo(RealtimeRooms.queues, "queue:created", { data: queue });
}

export function emitQueueUpdated(queue: unknown): void {
  emitTo(RealtimeRooms.queues, "queue:updated", { data: queue });
}

export function emitQueueDeleted(queue: unknown): void {
  emitTo(RealtimeRooms.queues, "queue:deleted", { data: queue });
}
