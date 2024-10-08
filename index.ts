import express from "express";
import mongoose from "mongoose";
import { archiveDiary } from "./utils/archiveDiary";

import userRoute from "./routes/user.route";
import regRoute from "./routes/reg.route";
import authRoute from "./routes/auth.route";
import meRoute from "./routes/me.route";
import diariesRoute from "./routes/diaries.route";

const PORT = process.env.PORT || 3010;

const app = express();

app.use(express.json());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", regRoute);

app.use("/api", authRoute);

app.use("/api", meRoute);

app.use("/api/diaries", diariesRoute);

app.use("/api/user", userRoute);

archiveDiary();

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:g0fucky0ursel4@test.5ixfi.mongodb.net/?retryWrites=true&w=majority&appName=pro-diary"
    );

    app.listen(PORT, () => {
      console.info(`Listening on: ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
