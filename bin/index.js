const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3010;
const app = express();

app.use(express.json({ extended: true }));

app.use("/api", require("../routes/reg.route"));

app.use("/api", require("../routes/auth.route"));

app.use("/api/diaries", (req, res) => {
  res.send({
    data: require("../mock/diaries.json"),
  });
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:g0fucky0ursel4@test.5ixfi.mongodb.net/?retryWrites=true&w=majority&appName=pro-diary"
    );

    app.listen(PORT, () => {
      console.log(`Listening on: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
