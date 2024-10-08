import { Router } from "express";
import User from "../models/User/User";
import jwt from "jsonwebtoken";

const router = Router();

// @ts-ignore
router.post("/me", async (req, res) => {
  try {
    const { token } = req.body;

    const data = jwt.decode(token);

    if (data.userId) {
      const user = await User.findOne({ _id: data.userId });

      if (user.type === "inactive") {
        return res.status(400).json({
          message: "Пользователь заблокирован или удалён",
        });
      }

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

export default router;
