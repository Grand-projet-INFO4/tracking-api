import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";
import trackerRouter from "./routes/tracker.route";

// Express application
const app = express();

// Helmet security
app.use(helmet());

// CORS handling
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API index
app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <h1>This is the Device Tracking API of Zaha Dia</h1>
  `);
});

// Tracker routes
app.use("/api/tracker", trackerRouter);

// Error handler
app.use(errorHandlerMiddleware);

export default app;
