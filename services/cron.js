var CronJob = require("cron").CronJob;
//TODO: use heroku job scheduler if this doesn't work
module.exports = {
  testCron(func) {
    console.log("hit!");
    return new CronJob("0 */1 * * * *", func, null, true, "America/New_York");
  },
  dailyCron(func) {
    return new CronJob("00 15 05 * * *", func, null, true, "America/New_York");
  },
  weeklyCron(func) {
    return new CronJob("00 30 06 * * 5", func, null, true, "America/New_York");
  },
};
