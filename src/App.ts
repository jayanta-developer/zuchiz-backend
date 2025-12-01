import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const mongoose = require("mongoose");
import bodyParser from "body-parser";

//routes
import BlogRoute from "./Router/blog";



const allowedOrigins = [
  "http://localhost:5173",
];


//DB
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database connected successful!"))
  .catch((err: any) =>
    console.log(
      "Database is not connected to the server, you are offline:",
      err
    )
  );


const App = express();
App.use(express.json({ limit: "5mb" }));
App.use(bodyParser.json());
App.use(express.urlencoded({ extended: true }));
App.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        // console.log('Allowed origin:', origin);
        callback(null, true);
      } else {
        // console.log('Blocked origin:', origin);
        callback(null, false);
      }
    },
    credentials: true,
  })
);
App.use("/zuchiz/api", BlogRoute);



export default App;