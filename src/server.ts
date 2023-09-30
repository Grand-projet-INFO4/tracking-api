import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import * as dotenv from "dotenv";

// The express application
import app from "./app";

// The Redis client's publisher and subscriber instances
import { publisher, subscriber } from "./redis-client";

// Connects to the MongoDB database
import { connectDatabase } from "./database/connection";

// Loading environment variables
dotenv.config({ path: path.resolve(__dirname, "../", ".env") });

// The http server
const httpServer = createServer(app);

// The socket.io server that wraps the http server
const io = new Server(httpServer);

// Connecting to the MongoDB database
connectDatabase();

// Registering the Socket.io's Redis adapter
io.adapter(createAdapter(publisher, subscriber));

// Port listening
const PORT = process.env.PORT as string;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ...`);
});
