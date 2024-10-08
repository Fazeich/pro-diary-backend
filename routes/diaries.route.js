const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Diary = require("../models/Diary");
const getSortedDiaries = require("../utils/getSortedDiaries");

const router = Router();

// Получение всех активных задач
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

      const activeDiaries = await Diary.find({
        owner: userId,
        archived: false,
        deleted: false,
      });

      const sortedDiaries = getSortedDiaries(activeDiaries);

      return res.status(200).json(sortedDiaries);
    } catch (error) {
      console.error(error);
    }
  }
);

// Получение всех неактивных задач
router.get(
  "/archive",
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
      const { userId, finished } = req.query;

      if (!!finished) {
        const archivedDiaries = await Diary.find({
          owner: userId,
          archived: true,
          deleted: false,
          finished,
        });

        const sortedDiaries = getSortedDiaries(archivedDiaries);

        return res.status(200).json(sortedDiaries);
      }

      const archivedDiaries = await Diary.find({
        owner: userId,
        archived: true,
      });

      const sortedDiaries = getSortedDiaries(archivedDiaries);

      return res.status(200).json(sortedDiaries);
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
        archived: false,
        deleted: false,
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
      message: "Задача успешно возвращена!",
    });
  }
);

// Архивирование задачи
router.post(
  "/archive",
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

    await Diary.updateOne({ _id: id }, { archived: true });

    res.status(200).json({
      message: "Задача успешно архивирована!",
    });
  }
);

// Возврат задачи из архива
router.post(
  "/archive/return",
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

    await Diary.updateOne({ _id: id }, { archived: false });

    res.status(200).json({
      message: "Задача успешно возвращена из архива!",
    });
  }
);

// Мягкое удаление задачи
router.post(
  "/delete",
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

    await Diary.updateOne({ _id: id }, { deleted: true });

    res.status(200).json({
      message: "Задача успешно удалена!",
    });
  }
);

module.exports = router;
