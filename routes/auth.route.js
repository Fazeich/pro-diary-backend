const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/auth", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        message: "Некорректные данные при авторизации",
      });
    }

    const user = await User.findOne({ login });

    if (!user) {
      return res.status(400).json({
        message: "Пользователь не найден",
      });
    }

    const isMatchedPasswords = await bcrypt.compare(password, user.password);

    if (!isMatchedPasswords) {
      return res.status(400).json({
        message: "Неверный пароль",
      });
    }

    const jwtSecret = "234b0260234fds0sdflsjer3r93i2vj23908r234";

    const token = jwt.sign(
      {
        userId: user.id,
        login: user.login,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        login: user.login,
        settings: user.settings,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
