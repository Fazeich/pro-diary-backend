import { Router } from "express";
import User from "../models/User/User";

const router = Router();

// @ts-ignore
router.post("/change", async (req, res) => {
  try {
    const { userId, userData } = req.body;

    if (!userId) {
      return res.status(400).json({
        messge: "Нет идентификатора пользователя",
      });
    }

    const user = await User.findOneAndUpdate({ _id: userId }, { ...userData });

    if (!user) {
      return res.status(400).json({
        messge: "Не удалось изменить пользователя",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// @ts-ignore
router.get("/settings", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        messge: "Нет идентификатора пользователя",
      });
    }

    const user = await User.findOne({ _id: userId });

    return res.status(200).json(user?.settings);
  } catch (error) {
    console.log(error);
  }
});

// @ts-ignore
router.post("/settings/server/change", async (req, res) => {
  try {
    const { userId, settings } = req.body;

    if (!userId) {
      return res.status(400).json({
        messge: "Нет идентификатора пользователя",
      });
    }

    const user = await User.findById(userId);

    const isPremium = user.type === "premium";

    if (!isPremium) {
      return res.status(400).json({
        message: "Для начала активируйте премиум",
      });
    }

    await User.updateOne(
      { _id: userId },
      { settings: { ...user?.settings, serverSettings: settings } }
    )
      .then(async () => {
        const newUser = await User.findById(userId);

        return res.status(200).json(newUser?.settings?.serverSettings);
      })
      .catch(() => {
        return res.status(400).json({
          message: "Не удалось обновить пользователя",
        });
      });
  } catch (error) {
    console.log(error);
  }
});

// @ts-ignore
router.post("/settings/user/change", async (req, res) => {
  try {
    const { userId, settings } = req.body;

    if (!userId) {
      return res.status(400).json({
        messge: "Нет идентификатора пользователя",
      });
    }

    const user = await User.findById(userId);

    await User.updateOne(
      { _id: userId },
      { settings: { ...user?.settings, userSettings: settings } }
    )
      .then(async () => {
        const newUser = await User.findById(userId);

        return res.status(200).json(newUser?.settings?.userSettings);
      })
      .catch(() => {
        return res.status(400).json({
          message: "Не удалось обновить пользователя",
        });
      });
  } catch (error) {
    console.log(error);
  }
});

export default router;
