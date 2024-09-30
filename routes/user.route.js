const { Router } = require("express");
const User = require("../models/User");

const router = Router();

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

router.get("/settings", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        messge: "Нет идентификатора пользователя",
      });
    }

    const user = await User.findOne({ _id: userId });

    return res.status(200).json(user.settings);
  } catch (error) {
    console.log(error);
  }
});

router.post("/settings/change", async (req, res) => {
  try {
    const { userId, settingsData } = req.body;

    if (!userId) {
      return res.status(400).json({
        messge: "Нет идентификатора пользователя",
      });
    }

    await User.updateOne(
      { _id: userId },
      { settings: { ...settingsData } }
    ).then(async () => {
      const user = await User.findById(userId);

      return res.status(200).json(user.settings);
    });

    return res.status(400).json({
      message: "Не удалось обновить пользователя",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
