const { CronJob } = require("cron");
const Diary = require("../models/Diary");
const User = require("../models/User");

const archiveDiary = async () => {
  const job = CronJob.from({
    cronTime: "0 0 0 * * *",
    onTick: async () => {
      console.log("asdasd");
      const users = await User.find({});

      users.forEach(async (currentUser) => {
        const { isDailyArchivating, isDailyClearArchive } =
          currentUser.settings.serverSettings;

        if (isDailyArchivating) {
          const user = await User.findById(currentUser._id);

          if (isDailyClearArchive) {
            // Удаляем все старые архивные задачи, если пользователь выбрал
            await Diary.updateMany(
              { owner: user._id, archived: true },
              { deleted: true }
            );
          }

          // Перемещаем все активные задачи в архив, если пользователь выбрал
          await Diary.updateMany(
            { owner: user._id, archived: false },
            { archived: true }
          );
        }
      });
    },
    start: false,
    timeZone: "Europe/Moscow",
  });

  job.start();
};

module.exports = archiveDiary;
