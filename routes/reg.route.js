const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const router = Router();

router.post(
  "/reg",
  [
    check("login", "Некорректный логин").isLength({ min: 6 }),
    check("password", "Некорректный пароль").isLength({ min: 7 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      const { login, password } = req.body;

      const isLoginUsed = await User.findOne({ login });

      if (isLoginUsed) {
        return res.status(300).json({
          message: "Пользователь с таким логином уже зарегистрирован!",
        });
      }

      const hashedPasword = await bcrypt.hash(password, 12);

      const user = new User({
        login,
        password: hashedPasword,
        settings: {
          userSettings: {
            isUsingEfficiency: false,
            efficiency: 6,
          },

          serverSettings: {
            isDailyClearArchive: false,
            isDailyArchivating: false,
            dailyArchivatingTime: 0,
            isShowWelcome: true,
            isShowLearn: true,
          },
        },
      });

      await user.save();

      return res.status(201).json({
        message: "Регистрация прошла успешно!",
      });
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = router;
