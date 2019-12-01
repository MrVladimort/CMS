import {Server} from "http";
import socketIo from "socket.io";
import {winstonLogger} from "./logger.service";

export async function initSocket(server: Server): Promise<void> {
    const io = socketIo(server);

    io.on("connection", (socket) => {
        winstonLogger.info("New client connected");

        // Here we listen on a new namespace called "incoming data"
        socket.on("incoming data", (data) => {
            // Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
            socket.broadcast.emit("outgoing data", {num: data});
        });

        // A special namespace "disconnect" for when a client disconnects
        socket.on("disconnect", () => winstonLogger.info("Client disconnected"));
    });
}
