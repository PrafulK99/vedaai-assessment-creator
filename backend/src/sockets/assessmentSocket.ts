import { Server as SocketIOServer } from "socket.io";
import type { Socket } from "socket.io";
import { Server as HttpServer } from "http";

let io: SocketIOServer;

export const initSocket = (server: HttpServer, clientUrl: string) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: clientUrl,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Client connected to Socket.IO: ${socket.id}`);

    // Join a room specific to a generation job
    socket.on("join-job", (jobId: string) => {
      socket.join(jobId);
      console.log(`📡 Socket ${socket.id} joined room for job: ${jobId}`);
    });

    // Leave the job room
    socket.on("leave-job", (jobId: string) => {
      socket.leave(jobId);
      console.log(`📡 Socket ${socket.id} left room for job: ${jobId}`);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Helper to emit job progress
export const emitJobProgress = (
  jobId: string,
  progress: number,
  message: string
) => {
  if (io) {
    io.to(jobId).emit("generation-progress", { progress, message });
  }
};

// Helper to emit job completion
export const emitJobCompleted = (jobId: string, assessmentId: string) => {
  if (io) {
    io.to(jobId).emit("generation-completed", { assessmentId });
  }
};

// Helper to emit job failure
export const emitJobFailed = (jobId: string, error: string) => {
  if (io) {
    io.to(jobId).emit("generation-failed", { error });
  }
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
