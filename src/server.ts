import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";

// The express application
import app from "./app";

// Loading environment variables
dotenv.config({ path: path.resolve(__dirname, "../", ".env") });

// The http server
const httpServer = createServer(app);

// The socket.io server that wraps the http server
const io = new Server(httpServer);

// Port listening
const PORT = process.env.PORT as string;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ...`);
});
