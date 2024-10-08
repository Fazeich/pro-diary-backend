const express = require("express");
const mongoose = require("mongoose");
const archiveDiary = require("./utils/archiveDiary");

const PORT = process.env.PORT || 3010;

const app = express();

app.use(express.json({ extended: true }));

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", require("./routes/reg.route"));

app.use("/api", require("./routes/auth.route"));

app.use("/api", require("./routes/me.route"));

app.use("/api/diaries", require("./routes/diaries.route"));

app.use("/api/user", require("./routes/user.route"));

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
