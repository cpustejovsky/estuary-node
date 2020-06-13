var CronJob = require("cron").CronJob;

module.exports = {
  testCron(func) {
    console.log("hit!");
    return new CronJob("0 */1 * * * *", func, null, true, "America/New_York");
  },
  dailyCron(func) {
    console.log("daily cron running")
    return new CronJob("00 20 08 * * *", func, null, true, "America/New_York");
  },
  weeklyCron(func) {
    return new CronJob("00 30 06 * * 5", func, null, true, "America/New_York");
  },
};
