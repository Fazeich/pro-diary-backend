const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Diary = require("../models/Diary");

const router = Router();

// Получение всех задач
router.get(
  "/",
  [check("userId", "Некорректный идентификатор пользователя").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: {
            errors,
            message: "Ошибка при получении данных",
          },
        });
      }
      const { userId } = req.query;

      const diaries = await Diary.find({ owner: userId });

      return res.status(200).json({
        data: diaries,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// Создание задачи
router.post(
  "/create",
  [check("userId", "Некорректный идентификатор пользователя").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: {
            errors,
            message: "Ошибка при получении данных",
          },
        });
      }
      const { userId, diary } = req.body;

      const newDiary = new Diary({
        ...diary,
        owner: userId,
        finished: false,
      });

      await newDiary.save();

      return res.status(200).json({
        diary: newDiary,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// Удаление конкретной задачи
router.delete(
  "/:id",
  [check("id", "Некорректный идентификатор записи").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: {
            errors,
            message: "Ошибка при получении данных",
          },
        });
      }
      const { id } = req.params;

      await Diary.findOneAndDelete({ _id: id });

      return res.status(200).json({
        message: "Запись была успешно удалена",
      });
    } catch (error) {
      console.error(error);
    }
  }
);

// Изменение атрбута задачи
router.put(
  "/:id",
  [check("id", "Некорректный идентификатор записи").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: {
          errors,
          message: "Ошибка при получении данных",
        },
      });
    }

    const diary = req.body;

    const newDiary = await Diary.updateOne(
      { _id: diary._id },
      {
        ...diary,
      }
    );

    res.status(200).json(newDiary);
  }
);

// Завершение задачи
router.post(
  "/finish",
  [check("id", "Некорректный идентификатор записи").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: {
          errors,
          message: "Ошибка при получении данных",
        },
      });
    }

    const { id } = req.body;

    if (!id) {
      res.status(500).json({ message: "Ошибка при получении данных" });
    }

    await Diary.updateOne({ _id: id }, { finished: true });

    res.status(200).json({
      message: "Задача успешно завершена!",
    });
  }
);

// Возврат задачи
router.post(
  "/return",
  [check("id", "Некорректный идентификатор записи").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: {
          errors,
          message: "Ошибка при получении данных",
        },
      });
    }

    const { id } = req.body;

    if (!id) {
      res.status(500).json({ message: "Ошибка при получении данных" });
    }

    await Diary.updateOne({ _id: id }, { finished: false });

    res.status(200).json({
      message: "Задача успешно завершена!",
    });
  }
);

module.exports = router;
