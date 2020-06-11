var CronJob = require("cron").CronJob;

module.exports = {
  testCron(func) {
    return new CronJob(
      "* * * * * *",
      func,
      null,
      true,
      "America/New_York"
    );
  },
  dailyCron(func) {
    return new CronJob(
      "00 30 06 */1 * *",
      func,
      null,
      true,
      "America/New_York"
    );
  },
  weeklyCron(func) {
    return new CronJob("00 30 06 * * 5", func, null, true, "America/New_York");
  },
};
