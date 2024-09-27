const { Router } = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/me", async (req, res) => {
  try {
    const { token } = req.body;

    const data = jwt.decode(token);

    if (data.userId) {
      const user = await User.findOne({ _id: data.userId });

      if (user) {
        return res.status(200).json({
          user: {
            id: user.id,
            login: user.login,
            settings: user.settings,
          },
        });
      }

      return res.status(400).json({
        message: "Пользователь не найден",
      });
    }

    return res.status(400).json({
      message: "Ошибка в обработке данных",
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
