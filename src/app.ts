import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";

// Express application
const app = express();

// Helmet security
app.use(helmet());

// CORS handling
app.use(cors);

// API index
app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <h1>This is the Device Tracking API of Zaha Dia</h1>
  `);
});

export default app;
