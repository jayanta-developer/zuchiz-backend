import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import BlogRoute from "./Router/blog";

dotenv.config();

const App = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://zuchiz-blog.vercel.app",
  "https://zuchiz-blog-bsz23o7yh-jayanta-deys-projects-1a61b44e.vercel.app",
];

// DB
mongoose
  .connect(process.env.DATABASE as string)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("DB connection failed:", err));

// Middleware
App.use(express.json({ limit: "5mb" }));
App.use(bodyParser.json());
App.use(express.urlencoded({ extended: true }));

App.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


// App.options("*", cors());

// Routes
App.use("/zuchiz/api", BlogRoute);

export default App;
