const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const router = Router();

router.get(
  "/users",
  async (req, res) => {
    try {

      const { userId } = req.body;

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
        diaries: [],
        settings: {
          theme: "light",
          efficiency: 12,
        },
      });

      await user.save();

      return res.status(201).json({
        message: "Регистрация прошла успешно!",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
